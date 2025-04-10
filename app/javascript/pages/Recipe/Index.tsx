import { Head, Link } from "@inertiajs/react";
import { Fragment } from "react";
import Recipe from "./Recipe";
import { RecipeType } from "./types";
import RecipeShort from "./RecipeShort";

interface IndexProps {
  recipes: RecipeType[];
}

export default function Index({ recipes }: IndexProps) {
  return (
    <>
      <Head title="Recettes" />
      <div className="mx-auto md:w-2/3 w-full px-8 pt-8">
        <Link
          href="/recipes/new"
          className="rounded-lg py-3 px-5 bg-blue-600 text-white block font-medium"
        >
          Poster une nouvelle recette
        </Link>

        <div className="flex flex-col mt-5 gap-5">
          {recipes.map((recipe) => (
            <RecipeShort key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </div>
    </>
  );
}
