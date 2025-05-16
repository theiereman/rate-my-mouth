import { RecipeType } from "@customTypes/recipe.types";
import { router } from "@inertiajs/react";
import { useFilePicker } from "use-file-picker";
import { FileSizeValidator } from "use-file-picker/validators";
import { useToast } from "@contexts/ToastProvider";
import { FILE_PICKER_ERROR_MESSAGES } from "@helpers/filepickerHelper";

type ThumbnailSize = "sm" | "md" | "lg" | "xl";

interface ThumbnailProps {
  recipe: RecipeType;
  size?: ThumbnailSize;
  className?: string;
  allowThumbnailChange?: boolean;
}

const getSizeClasses = (size: ThumbnailSize) => {
  switch (size) {
    case "sm":
      return "w-32 h-32";
    case "md":
      return "w-full h-64";
    case "lg":
      return "w-full h-80";
    case "xl":
      return "w-full h-96";
    default:
      return "w-full h-64";
  }
};

export const RecipeThumbnail = ({
  recipe,
  size = "md",
  className = "",
  allowThumbnailChange = false,
}: ThumbnailProps) => {
  const { showToast } = useToast();

  const { openFilePicker } = useFilePicker({
    accept: [".jpg", ".jpeg", ".png"],
    readAs: "Text",
    multiple: false,
    validators: [
      new FileSizeValidator({ minFileSize: 0, maxFileSize: 10 * 1024 * 1024 }), // 5MB max
    ],
    onFilesRejected: (data) => {
      data.errors.forEach((error) => {
        showToast(
          FILE_PICKER_ERROR_MESSAGES[error.reason] ||
            "Erreur lors de la sélection de l'image.",
          {
            type: "error",
          }
        );
      });
    },
    onFilesSuccessfullySelected: ({ plainFiles }) => {
      router.patch(`/recipes/${recipe.id}`, {
        recipe: { thumbnail: plainFiles[0] },
      });
    },
  });

  const sizeClasses = getSizeClasses(size);
  const cursorClass = allowThumbnailChange ? "cursor-pointer" : "";

  return (
    <div className={`relative ${className} group overflow-hidden rounded-lg`}>
      {allowThumbnailChange && (
        <div
          onClick={openFilePicker}
          className="absolute top-0 left-0 w-full h-full hidden group-hover:flex cursor-pointer bg-black/60 text-white items-center justify-center flex-col gap-2"
        >
          <span className="material-symbols-outlined material-icon--lg">
            add_photo_alternate
          </span>
          <span className="text-sm font-medium">Modifier l'image</span>
        </div>
      )}
      {recipe.thumbnail_url ? (
        <img
          src={recipe.thumbnail_url}
          alt={recipe.name}
          className={`${sizeClasses} ${cursorClass} object-cover`}
        />
      ) : (
        <div
          className={`${sizeClasses} ${cursorClass} bg-primary-100 flex items-center justify-center text-primary-500`}
        >
          <span className="material-symbols-outlined material-icon--lg">
            restaurant
          </span>
        </div>
      )}
    </div>
  );
};

export default RecipeThumbnail;
