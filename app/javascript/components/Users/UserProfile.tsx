import { UserType } from "@customTypes/user.types";
import { Badge } from "@components/ui";
import { formatDate } from "@helpers/DateHelper";
import UserAvatar from "@components/Users/UserAvatar";
import { useUserIsCurrentUser } from "@hooks/useUserIsCurrentUser";
import { Section } from "@components/ui";
import { useFilePicker } from "use-file-picker";
import { FileSizeValidator } from "use-file-picker/validators";
import { FILE_PICKER_ERROR_MESSAGES } from "@helpers/FilepickerHelper";
import { router } from "@inertiajs/react";
import { useToast } from "@contexts/ToastContext";

export default function UserProfile({ user }: { user: UserType }) {
  const { isCurrentUser } = useUserIsCurrentUser(user);

  const { showToast } = useToast();

  const { openFilePicker } = useFilePicker({
    accept: [".jpg", ".jpeg", ".png"],
    readAs: "Text",
    multiple: false,
    validators: [
      new FileSizeValidator({ minFileSize: 0, maxFileSize: 5 * 1024 * 1024 }),
    ],
    onFilesRejected: (data) => {
      data.errors.forEach((error) => {
        showToast(
          FILE_PICKER_ERROR_MESSAGES[(error as any).reason] ||
            "Erreur lors de la selection de l'image.",
          {
            type: "error",
          },
        );
      });
    },
    onFilesSuccessfullySelected: ({ plainFiles }) => {
      router.patch(`/users/${user.id}/update_avatar`, {
        user: { avatar: plainFiles[0] },
      });
    },
  });

  return (
    <Section title="Profil">
      <div className="mb-4 flex items-center gap-4">
        <UserAvatar
          user={user}
          size="xl"
          onClick={isCurrentUser ? openFilePicker : undefined}
          title="Modifier l'avatar"
          iconOnHover={
            isCurrentUser ? (
              <span className="material-symbols-outlined">edit</span>
            ) : undefined
          }
        />

        <div className="flex-1">
          <h3 className="text-xl font-semibold text-neutral-800">
            {user.username}
          </h3>
          {user.title ? (
            <p className="text-sm text-neutral-700">{user.title}</p>
          ) : (
            <p className="text-sm text-neutral-400 italic">
              Aucun titre selectionné
            </p>
          )}
          <p className="text-xs font-light text-neutral-600">
            Membre depuis le {formatDate(user.created_at)}
          </p>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        <Badge>{`${user.comments_count} commentaires`}</Badge>
        <Badge>{`${user.recipes_count} recettes`}</Badge>
        <Badge>{`${user.ratings_count} évaluations`}</Badge>
      </div>
    </Section>
  );
}
