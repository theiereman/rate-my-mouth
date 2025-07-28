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

  return (
    <div
      className={`relative ${className} group border-primary-900 overflow-hidden border-3`}
    >
      {onThumbnailSelected && (
        <div className="absolute top-0 left-0 hidden h-full w-full items-center justify-center gap-2 bg-black/60 text-white group-hover:flex">
          <div
            onClick={openFilePicker}
            className={`flex cursor-pointer flex-col items-center gap-2 hover:text-green-600`}
          >
            <span className="material-symbols-outlined material-icon--lg">
              add_photo_alternate
            </span>
            <span className="text-sm font-medium">Modifier la miniature</span>
          </div>
          {url && (
            <div
              onClick={() => {
                onThumbnailSelected(null);
                setUrl(undefined);
              }}
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
        </div>
      )}
    </div>
  );
};

export default RecipeThumbnail;
