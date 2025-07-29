import Form from "@components/Recipes/Form/RecipeForm";

export default function New() {
  return (
    <Form
      onSubmit={(form) => {
        form.transform((data) => ({ recipe: data }));
        form.post("/recipes");
      }}
    />
  );
}
