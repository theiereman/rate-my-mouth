import { UserType } from "@customTypes/user.types";
import { Badge, LinkButton } from "@components/ui";
import { formatDate } from "@helpers/date-helper";
import UserAvatar from "@components/Users/UserAvatar";
import { useUserIsCurrentUser } from "@hooks/useUserIsCurrentUser";
import Section from "@components/ui/Pages/Section";
import { useFilePicker } from "use-file-picker";
import { FileSizeValidator } from "use-file-picker/validators";
import { FILE_PICKER_ERROR_MESSAGES } from "@helpers/filepickerHelper";
import { router } from "@inertiajs/react";

export default function UserProfile({ user }: { user: UserType }) {
  const { isCurrentUser } = useUserIsCurrentUser(user);

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
          }
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
    <Section title="Profil" underlineStroke={4}>
      <div className="flex gap-4 items-center">
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
            {user.username} {isCurrentUser && `(${user.email})`}
          </h3>
          {user.title ? (
            <p className="text-sm text-neutral-700">{user.title}</p>
          ) : (
            <p className="italic text-sm text-neutral-400">
              Aucun titre selectionné
            </p>
          )}
          <p className="text-xs font-light text-neutral-600">
            Membre depuis le {formatDate(user.created_at)}
          </p>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        <Badge text={`${user.comments_count} commentaires`} variant="primary" />
        <Badge text={`${user.recipes_count} recettes`} variant="secondary" />
        <Badge text={`${user.ratings_count} évaluations`} variant="accent" />
      </div>
    </Section>
  );
}
