import { useFilePicker } from "use-file-picker";
import { FileSizeValidator } from "use-file-picker/validators";
import { useToast } from "@contexts/ToastContext";
import { FILE_PICKER_ERROR_MESSAGES } from "@helpers/FilepickerHelper";
import { useState } from "react";

interface ThumbnailProps {
  thumbnailUrl?: string;
  className?: string;
  allowThumbnailChange?: boolean;
  onThumbnailSelected?: (file: File | null) => void;
}

export const RecipeThumbnail = ({
  thumbnailUrl,
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
          FILE_PICKER_ERROR_MESSAGES[(error as any).reason] ||
            "Erreur lors de la sélection de l'image.",
          {
            type: "error",
          },
        );
      });
    },
    onFilesSuccessfullySelected: ({ plainFiles, filesContent }) => {
      onThumbnailSelected && onThumbnailSelected(plainFiles[0]);
      setUrl(filesContent[0].content);
    },
  });

  const cursorClass = !onThumbnailSelected ? "" : "cursor-pointer";

  const isMobile = () => {
    return (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent,
      ) || window.innerWidth < 768
    );
  };

  const handleContainerClick = () => {
    if (onThumbnailSelected) {
      if (isMobile()) {
        openFilePicker();
      }
    }
  };

  const handleDeleteImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onThumbnailSelected) {
      onThumbnailSelected(null);
      setUrl(undefined);
    }
  };

  return (
    <div
      className={`relative ${className} group border-primary-900 overflow-hidden border-3`}
      onClick={handleContainerClick}
    >
      {onThumbnailSelected && (
        <div className="absolute top-0 left-0 hidden h-full w-full items-center justify-center gap-2 bg-black/60 text-white group-hover:flex">
          <div
            onClick={(e) => {
              e.stopPropagation();
              openFilePicker();
            }}
            className={`flex cursor-pointer flex-col items-center gap-2 hover:text-green-600`}
          >
            <span className="material-symbols-outlined material-icon--lg">
              add_photo_alternate
            </span>
            <span className="text-sm font-medium">Modifier la miniature</span>
          </div>
          {url && (
            <div
              onClick={handleDeleteImage}
              className="hover:text-error-600 flex cursor-pointer flex-col items-center gap-2"
            >
              <span className="material-symbols-outlined material-icon--lg">
                delete
              </span>
              <span className="text-sm font-medium">Supprimer l'image</span>
            </div>
          )}
        </div>
      )}
      {onThumbnailSelected && url && (
        <button
          onClick={handleDeleteImage}
          className="absolute top-2 right-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-red-500/80 text-white hover:bg-red-600/90 md:hidden"
        >
          <span className="material-symbols-outlined text-lg">delete</span>
        </button>
      )}
      {url ? (
        <img
          src={url}
          alt="Miniature de la recette"
          className={`h-64 w-full ${cursorClass} object-cover`}
        />
      ) : (
        <div
          className={`h-64 w-full ${cursorClass} bg-primary-100 text-primary-900 flex flex-col items-center justify-center`}
        >
          <span className="material-symbols-outlined material-icon--lg">
            add_photo_alternate
          </span>
          <span className="text-sm font-medium">Aucune miniature</span>
          {onThumbnailSelected && (
            <span className="text-primary-700 mt-1 text-xs md:hidden">
              Touchez pour ajouter
            </span>
          )}
        </div>
      )}
      {/* Indicateur visuel sur mobile pour les images existantes */}
      {onThumbnailSelected && url && (
        <div className="absolute right-2 bottom-2 rounded-full bg-black/50 p-2 text-white md:hidden">
          <span className="material-symbols-outlined text-sm">edit</span>
        </div>
      )}
    </div>
  );
};

export default RecipeThumbnail;
