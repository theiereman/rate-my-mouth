import { InertiaFormProps, useForm } from "@inertiajs/react";
import { FormEvent } from "react";
import { RecipeFormType, RecipeType } from "./types";
import RecipeEditor from "./components/RecipeEditor";
import { Button, Input, Card } from "../../components/ui";

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
          <h2 className="text-xl font-semibold text-neutral-800">
            Informations générales
          </h2>
        </Card.Header>
        <Card.Body className="space-y-4">
          <div>
            <Input
              label="Nom de la recette"
              type="text"
              name="name"
              id="name"
              value={data.name}
              onChange={(e) => setData("name", e.target.value)}
              error={errors.name}
              fullWidth
              placeholder="Ex: Tarte aux pommes, Poulet rôti aux herbes..."
              data-1p-ignore
              data-lpignore="true"
              data-protonpass-ignore="true"
            />
          </div>

          <div>
            <Input
              label="URL de la source (optionnel)"
              type="text"
              name="url"
              id="url"
              value={data.url}
              onChange={(e) => setData("url", e.target.value)}
              error={errors.url}
              fullWidth
              placeholder="https://..."
              helperText="Si cette recette provient d'un site web, vous pouvez indiquer l'URL ici"
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
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
            </svg>
          }
        >
          {submitText}
        </Button>
      </div>
    </form>
  );
}
