import { InertiaFormProps, useForm } from "@inertiajs/react";
import { FormEvent } from "react";
import { RecipeFormType, RecipeType } from "@customTypes/recipe.types";
import { TagType } from "@customTypes/tag.types";
import { Button, Input, Combo, TextArea, LinkButton } from "@components/ui";
import RecipeThumbnail from "../RecipeThumbnail";
import RecipeContentForm from "./RecipeContentForm";
import { Section } from "@components/ui";
import Page from "@components/ui/Page";
import TagsCombo from "@components/Tags/TagCombo";
import {
  getDifficultyLabel,
  getDifficultyValue,
} from "@helpers/RecipeDifficultyHelper";

interface FormProps {
  recipe?: RecipeType;
  onSubmit: (form: InertiaFormProps<RecipeFormType>) => void;
}

export default function Form({ recipe, onSubmit }: FormProps) {
  const form = useForm<RecipeFormType>({
    name: recipe?.name || "",
    ingredients_attributes:
      recipe?.ingredients?.map((ing) => ({
        id: ing.id,
        name: ing.name,
        category: ing.category || "",
      })) || [],
    instructions_attributes:
      recipe?.instructions?.map((inst) => ({
        id: inst.id,
        name: inst.name,
        category: inst.category || "",
      })) || [],
    url: recipe?.url || "",
    number_of_servings: recipe?.number_of_servings || 4,
    difficulty: getDifficultyValue(recipe?.difficulty.toString() || "") || 0,
    description: recipe?.description || "",
    tags_attributes:
      recipe?.tags?.map((tag) => ({ id: tag.id, name: tag.name })) || [],
    thumbnail: undefined,
  });
  const { data, setData, errors, processing } = form;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(form);
  };

  console.log(data.difficulty);

  return (
    <form onSubmit={handleSubmit} className="contents">
      <Page
        title={recipe ? "Modifier la recette" : "Nouvelle recette"}
        subtitle="Partagez votre recette avec le reste de la communauté et inspirez d'autres cuisiniers !"
      >
        <RecipeThumbnail
          thumbnailUrl={data.thumbnail || recipe?.thumbnail_url}
          allowThumbnailChange={true}
          onThumbnailSelected={(file) => {
            setData("thumbnail", file as unknown as string);
          }}
        />

        <Section title="Informations générales" variant="ghost">
          <div className="flex flex-col gap-2">
            <Input
              label="Nom de la recette *"
              type="text"
              name="name"
              id="name"
              value={data.name}
              onChange={(e) => setData("name", e.target.value)}
              error={errors.name}
              placeholder="Tarte aux pommes, Poulet rôti aux herbes..."
              data-1p-ignore
              data-lpignore="true"
              data-protonpass-ignore="true"
            />

            <TextArea
              label="Description"
              name="description"
              id="description"
              value={data.description}
              onChange={(e) => setData("description", e.target.value)}
              placeholder="Une recette de mon enfance qui me donne les larmes aux yeux quand j'y pense..."
            />

            <Input
              label="URL de la source (optionnel)"
              type="text"
              name="url"
              id="url"
              value={data.url}
              onChange={(e) => setData("url", e.target.value)}
              error={errors.url}
              placeholder="https://..."
              // helperText="Si cette recette provient d'un site web, vous pouvez indiquer l'URL ici"
            />

            <div className="grid grid-cols-1 items-start gap-4 md:grid-cols-3">
              <Input
                label="Nombre de personne *"
                type="number"
                name="number_of_servings"
                id="number_of_servings"
                value={data.number_of_servings}
                onChange={(e) =>
                  setData("number_of_servings", parseInt(e.target.value))
                }
                error={errors.number_of_servings}
              />

              <Combo
                label="Difficulté *"
                selectedValue={{
                  value: data.difficulty,
                  label: getDifficultyLabel(data.difficulty),
                }}
                values={[
                  { value: 0, label: "Facile" },
                  { value: 1, label: "Moyen" },
                  { value: 2, label: "Difficile" },
                ]}
                onSelectedValue={(value) =>
                  setData("difficulty", value?.value ?? 0)
                }
                className="w-full"
              />

              <TagsCombo
                selectedTags={(data.tags_attributes || []).map((tag) => ({
                  id: tag.id || 0,
                  name: tag.name,
                  recipes_count: 0,
                }))}
                onSelectedTagsChange={(selectedTags: TagType[]) => {
                  setData(
                    "tags_attributes",
                    selectedTags.map((tag) => ({
                      id: tag.id,
                      name: tag.name,
                    })),
                  );
                }}
                className="w-full"
              />
            </div>
          </div>
        </Section>

        <RecipeContentForm
          initialIngredients={
            data.ingredients_attributes.map((ing) => ({
              id: ing.id || 0,
              name: ing.name,
              category: ing.category,
            })) || []
          }
          initialInstructions={
            data.instructions_attributes.map((inst) => ({
              id: inst.id || 0,
              name: inst.name,
              category: inst.category,
            })) || []
          }
          onDataChange={(contentData) => {
            setData(
              "ingredients_attributes",
              contentData.ingredients_attributes,
            );
            setData(
              "instructions_attributes",
              contentData.instructions_attributes,
            );
          }}
        />

        <div className="flex justify-end gap-6">
          <LinkButton
            variant="ghost"
            href={recipe?.id ? `/recipes/${recipe.id}` : "/recipes"}
          >
            Annuler
          </LinkButton>
          <Button type="submit" disabled={processing}>
            {recipe ? "Valider les modifications" : "Créer la recette"}
          </Button>
        </div>
      </Page>
    </form>
  );
}
