import { Head, Link } from "@inertiajs/react";
import Recipe from "./Recipe";
import { RecipeType } from "./types";
import CommentForm from "./comments/CommentForm";

interface ShowProps {
  recipe: RecipeType;
}

export default function Show({ recipe }: ShowProps) {
  return (
    <>
      <Head title={`${recipe.name} de ${recipe.user.username}`} />

      <div className="mx-auto md:w-2/3 w-full px-8 pt-8">
        <div className="mx-auto">
          <h1 className="font-bold text-4xl">{recipe.name}</h1>
          <h3 className="italic">de {recipe.user.username}</h3>
          <iframe src={recipe.url}></iframe>
          <h2 className="font-bold text-2xl mt-8">Commentaires</h2>
          {recipe.comments.length > 0 ? (
            <ul className="list-disc list-inside">
              {recipe.comments.map((comment) => (
                <li key={comment.id} className="my-2">
                  <strong>{comment.user.username}</strong>: {comment.content}
                </li>
              ))}
            </ul>
          ) : (
            <p>No comments yet.</p>
          )}
          <Link
            href={`/recipes/${recipe.id}/edit`}
            className="mt-2 rounded-lg py-3 px-5 bg-gray-100 inline-block font-medium"
          >
            Edit this recipe
          </Link>
          <Link
            href="/recipes"
            className="ml-2 rounded-lg py-3 px-5 bg-gray-100 inline-block font-medium"
          >
            Back to recipes
          </Link>
          <div className="inline-block ml-2">
            <Link
              href={`/recipes/${recipe.id}`}
              as="button"
              method="delete"
              className="mt-2 rounded-lg py-3 px-5 bg-gray-100 font-medium"
            >
              Destroy this recipe
            </Link>
          </div>
          <CommentForm recipeId={recipe.id} />
        </div>
      </div>
    </>
  );
}
