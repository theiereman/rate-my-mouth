import { Section } from "@components/ui";
import Toggle from "@components/ui/Toggle";
import { UserType } from "@customTypes/user.types";
import { router } from "@inertiajs/react";
import { ChangeEvent, useState } from "react";

export default function UserPreferences({ user }: { user: UserType }) {
  const [values, setValues] = useState({
    notification_preference: user.notification_preference,
  });

  const handleNotificationPreferenceChange = (
    e: ChangeEvent<HTMLInputElement>,
  ) => {
    const value = e.target.checked;
    setValues((prev) => ({
      ...prev,
      notification_preference: value,
    }));
    router.patch(
      `/users/${user.id}`,
      {
        user: {
          ...values,
          notification_preference: value,
        },
      },
      {
        preserveScroll: true,
        preserveState: true,
      },
    );
  };

  return (
    <Section title="Préférences" variant="ghost">
      <Toggle
        checked={values.notification_preference}
        onChange={handleNotificationPreferenceChange}
        label={`Envoyer les notifications par e-mail à ${user.email}`}
        helperText="Recevoir des notifications par e-mail pour les nouvelles recettes et les commentaires."
      />
    </Section>
  );
}
