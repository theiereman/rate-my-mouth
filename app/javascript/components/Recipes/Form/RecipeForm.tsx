import { InertiaFormProps, useForm } from "@inertiajs/react";
import { FormEvent } from "react";
import { RecipeFormType, RecipeType } from "@customTypes/recipe.types";
import RecipeEditor from "./RecipeIngredientInstructionsForm";
import { Button, Input, Card, Combo, TextArea } from "@components/ui";
import TagsSelector from "@components/Tags/TagsSelector";

interface FormProps {
  recipe: RecipeType;
  onSubmit: (form: InertiaFormProps<RecipeFormType>) => void;
  submitText: string;
}

export default function Form({ recipe, onSubmit, submitText }: FormProps) {
  const form = useForm<RecipeFormType>({
    name: recipe.name || "",
    ingredients: recipe.ingredients || [],
    instructions: recipe.instructions || [],
    url: recipe.url || "",
    number_of_servings: recipe.number_of_servings || 4,
    difficulty: recipe.difficulty_value || 0,
    description: recipe.description || "",
    tags_attributes:
      recipe.tags?.map((tag) => ({ id: tag.id, name: tag.name })) || [],
  });
  const { data, setData, errors, processing } = form;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="contents">
      <Card variant="outlined">
        <Card.Header>
          <h2 className="text-xl font-semibold text-neutral-800 flex items-center gap-1">
            <span className="material-symbols-outlined text-primary-600">
              article
            </span>
            Informations générales
          </h2>
        </Card.Header>
        <Card.Body className="space-y-4">
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
        </Card.Body>
      </Card>

      <RecipeEditor form={form} />

      <div className="mt-8 flex justify-end">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          isLoading={processing}
        >
          {submitText}
        </Button>
      </div>
    </form>
  );
}
