import { useFilePicker } from "use-file-picker";
import { FileSizeValidator } from "use-file-picker/validators";
import { useToast } from "@contexts/ToastProvider";
import { FILE_PICKER_ERROR_MESSAGES } from "@helpers/filepickerHelper";
import { useState } from "react";

type ThumbnailSize = "sm" | "md" | "lg" | "xl";

interface ThumbnailProps {
  thumbnailUrl?: string;
  size?: ThumbnailSize;
  className?: string;
  allowThumbnailChange?: boolean;
  onThumbnailSelected?: (file: File | null) => void;
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
  thumbnailUrl,
  size = "md",
  className = "",
  onThumbnailSelected,
}: ThumbnailProps) => {
  const [url, setUrl] = useState(thumbnailUrl);

  const { showToast } = useToast();
  const { openFilePicker } = useFilePicker({
    accept: [".jpg", ".jpeg", ".png"],
    readAs: "DataURL",
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
    onFilesSuccessfullySelected: ({ plainFiles, filesContent }) => {
      onThumbnailSelected && onThumbnailSelected(plainFiles[0]);
      setUrl(filesContent[0].content);
    },
  });

  const sizeClasses = getSizeClasses(size);
  const cursorClass = !onThumbnailSelected ? "" : "cursor-pointer";

  return (
    <div className={`relative ${className} group overflow-hidden rounded-lg`}>
      {onThumbnailSelected && (
        <div className="absolute top-0 left-0 w-full h-full hidden group-hover:flex bg-black/60 text-white items-center justify-center gap-2">
          <div
            onClick={openFilePicker}
            className="flex flex-col items-center gap-2 cursor-pointer hover:text-valid-600"
          >
            <span className="material-symbols-outlined material-icon--lg">
              add_photo_alternate
            </span>
            <span className="text-sm font-medium">Modifier l'image</span>
          </div>
          {url && (
            <div
              onClick={() => {
                onThumbnailSelected(null);
                setUrl(undefined);
              }}
              className="flex flex-col items-center gap-2 cursor-pointer hover:text-error-600"
            >
              <span className="material-symbols-outlined material-icon--lg">
                delete
              </span>
              <span className="text-sm font-medium">Supprimer l'image</span>
            </div>
          )}
        </div>
      )}
      {url ? (
        <img
          src={url}
          alt="Miniature de la recette"
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
