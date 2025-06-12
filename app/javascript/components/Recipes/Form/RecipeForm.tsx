import { InertiaFormProps, useForm } from "@inertiajs/react";
import { FormEvent } from "react";
import { RecipeFormType, RecipeType } from "@customTypes/recipe.types";
import { Button, Input, Combo, TextArea, LinkButton } from "@components/ui";
import TagsSelector from "@components/Tags/TagsSelector";
import RecipeThumbnail from "../RecipeThumbnail";
import RecipeContentSubform from "./RecipeContentSubform";
import Section from "@components/ui/Pages/Section";
import Page from "@components/ui/Pages/Page";

interface FormProps {
  recipe: RecipeType;
  onSubmit: (form: InertiaFormProps<RecipeFormType>) => void;
  submitText: string;
  title: string;
}

export default function Form({
  recipe,
  onSubmit,
  submitText,
  title,
}: FormProps) {
  const form = useForm<RecipeFormType>({
    name: recipe.name || "",
    ingredients_attributes:
      recipe.ingredients?.map((ing) => ({
        id: ing.id,
        name: ing.name,
        category: ing.category || "",
      })) || [],
    instructions_attributes:
      recipe.instructions?.map((inst) => ({
        id: inst.id,
        name: inst.name,
        category: inst.category || "",
      })) || [],
    url: recipe.url || "",
    number_of_servings: recipe.number_of_servings || 4,
    difficulty: recipe.difficulty_value || 0,
    description: recipe.description || "",
    tags_attributes:
      recipe.tags?.map((tag) => ({ id: tag.id, name: tag.name })) || [],
    thumbnail: undefined,
  });
  const { data, setData, errors, processing } = form;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="contents">
      <Page
        title={title}
        subtitle="Partagez votre recette avec le reste de la communauté et inspirez d'autres cuisiniers !"
      >
        <RecipeThumbnail
          thumbnailUrl={data.thumbnail || recipe.thumbnail_url}
          allowThumbnailChange={true}
          onThumbnailSelected={(file) => {
            setData("thumbnail", file as unknown as string);
          }}
        />

        <Section title="Informations générales" underlineStroke={1}>
          <Input
            mandatory
            label="Nom de la recette"
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
            error={errors.description}
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
            helperText="Si cette recette provient d'un site web, vous pouvez indiquer l'URL ici"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
            <Input
              mandatory
              label="Nombre de personnes"
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
              mandatory
              label="Difficulté"
              values={[
                { value: 0, label: "Facile" },
                { value: 1, label: "Moyen" },
                { value: 2, label: "Difficile" },
              ]}
              onSelectedValue={(value) =>
                setData("difficulty", value?.value ?? 0)
              }
              value={data.difficulty}
              className="w-full"
            />

            <TagsSelector
              initialTags={data.tags_attributes}
              onTagsSelected={(tags) => setData("tags_attributes", tags)}
              maxTags={3}
              className="w-full"
            />
          </div>
        </Section>

        <RecipeContentSubform
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
              contentData.ingredients_attributes
            );
            setData(
              "instructions_attributes",
              contentData.instructions_attributes
            );
          }}
        />

        <div className="flex gap-2 justify-end">
          <LinkButton
            preserveScroll
            variant="ghost"
            href={recipe.id ? `/recipes/${recipe.id}` : "/recipes"}
          >
            Annuler
          </LinkButton>
          <Button type="submit" variant="primary" isLoading={processing}>
            {submitText}
          </Button>
        </div>
      </Page>
    </form>
  );
}
