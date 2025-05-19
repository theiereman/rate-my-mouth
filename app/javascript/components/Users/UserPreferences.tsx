import { Card } from "@components/ui";
import Toggle from "@components/ui/Toggle";
import { UserType } from "@customTypes/user.types";
import { router } from "@inertiajs/react";
import { ChangeEvent, useState } from "react";

export default function UserPreferences({ user }: { user: UserType }) {
  const [values, setValues] = useState({
    notification_preference: user.notification_preference,
  });

  const handleNotificationPreferenceChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.checked;
    setValues((prev) => ({
      ...prev,
      notification_preference: value,
    }));
    router.patch(`/users/${user.id}`, {
      user: {
        ...values,
        notification_preference: value,
      },
    });
  };

  return (
    <Card>
      <Card.Header>
        <h2 className="text-xl font-semibold text-neutral-800 flex items-center gap-2">
          <span className="material-symbols-outlined text-primary-600">
            settings
          </span>
          Préférences
        </h2>
      </Card.Header>
      <Card.Body>
        <div className="flex flex-col gap-4">
          <div>
            <Toggle
              checked={values.notification_preference}
              onChange={handleNotificationPreferenceChange}
              label="Activer les notifications par e-mail"
              helperText="Recevoir des notifications par e-mail pour les nouvelles recettes et les commentaires."
            />
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}
