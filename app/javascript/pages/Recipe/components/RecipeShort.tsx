import { Link } from "@inertiajs/react";
import { formatDate } from "../../../helpers/dateHelper";
import { RecipeType } from "../types";
import { Rating } from "@mui/material";
import { Badge, Card } from "../../../components/ui";
import DifficultyBadge from "./DifficultyBadge";

interface RecipeProps {
  recipe: RecipeType;
}

export default function Recipe({ recipe }: RecipeProps) {
  return (
    <Link href={`/recipes/${recipe.id}`} className="block">
      <Card
        variant="outlined"
        className="transition-all duration-300 hover:shadow-md hover:border-primary-300 overflow-hidden"
        hover
      >
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Recipe image placeholder */}
          <div className="w-full sm:w-32 h-32 bg-primary-100 rounded-md flex items-center justify-center text-primary-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-12 h-12"
            >
              <path d="M8.1 13.34l2.83-2.83L3.91 3.5c-1.56 1.56-1.56 4.09 0 5.66l4.19 4.18zm6.78-1.81c1.53.71 3.68.21 5.27-1.38 1.91-1.91 2.28-4.65.81-6.12-1.46-1.46-4.2-1.1-6.12.81-1.59 1.59-2.09 3.74-1.38 5.27L3.7 19.87l1.41 1.41L12 14.41l6.88 6.88 1.41-1.41L13.41 13l1.47-1.47z" />
            </svg>
          </div>

          <div className="flex-1">
            <div className="flex flex-col mb-3">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-lg font-medium text-neutral-800">
                  {recipe.name}
                </h3>
                <Rating
                  size="small"
                  value={recipe.average_rating}
                  readOnly
                  className="text-primary-400"
                />
              </div>
              <p className="text-sm text-neutral-600">
                par <span className="font-medium">{recipe.user.username}</span>
              </p>
            </div>

            <div className="flex flex-wrap gap-3 mb-3">
              <Badge variant="primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5 mr-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                  <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
                </svg>
                {recipe.comments.length} commentaire
                {recipe.comments.length > 1 ? "s" : ""}
              </Badge>
              <Badge variant="secondary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5 mr-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                {recipe.ratings.length} note
                {recipe.ratings.length > 1 ? "s" : ""}
              </Badge>
              <DifficultyBadge
                difficulty={recipe.difficulty_value}
              ></DifficultyBadge>
            </div>

            <div className="text-xs text-neutral-500 flex flex-wrap gap-2">
              <span>Créé le {formatDate(recipe.created_at)}</span>
              <span>|</span>
              <span>Mis à jour le {formatDate(recipe.updated_at)}</span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
