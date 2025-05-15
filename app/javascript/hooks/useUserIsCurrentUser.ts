import { PageProps } from "@customTypes/usepage-props.types";
import { UserType } from "@customTypes/user.types";
import { usePage } from "@inertiajs/react";

export function useUserIsCurrentUser(user: UserType) {
  const { current_user } = usePage<PageProps>().props;

  const isCurrentUser = current_user && user.username === current_user.username;

  return { isCurrentUser };
}
