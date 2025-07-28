import { Combo, ComboValue } from "@components/ui";
import { UserType } from "@customTypes/user.types";
import { useState, useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";
import axios from "axios";

interface UserComboProps {
  label?: string;
  selectedUser: UserType | null;
  onSelectedUserChange: (user: UserType | null) => void;
  className?: string;
}

export default function UserCombo({
  label = "Auteur de la recette",
  selectedUser,
  onSelectedUserChange,
  className,
}: UserComboProps) {
  const [users, setUsers] = useState<UserType[]>([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [error, setError] = useState<string>();

  const searchUsers = async (value: string) => {
    try {
      setIsLoadingUsers(true);
      setError(undefined);
      const response = await axios.get(
        `/users${value ? `?username=${value}` : ""}`,
      );
      setUsers(response.data.users);
    } catch (error) {
      setError("Erreur lors du chargement des utilisateurs");
    } finally {
      setIsLoadingUsers(false);
    }
  };

  const debouncedSearchUsers = useDebouncedCallback(searchUsers, 500);

  const initUsers = () => searchUsers("");

  // Charger les utilisateurs au montage du composant
  useEffect(() => {
    initUsers();
  }, []);

  return (
    <div className={`space-y-1 ${className || ""}`}>
      <Combo
        label={label}
        rightIcon={
          isLoadingUsers ? (
            <span className="material-symbols-outlined animate-spin">
              progress_activity
            </span>
          ) : undefined
        }
        values={users.map((user) => ({
          value: user.id,
          label: user.username,
        }))}
        selectedValue={
          selectedUser
            ? { value: selectedUser.id, label: selectedUser.username }
            : undefined
        }
        onSearchValueChange={(value: string) => {
          if (value.trim() === "") {
            console.log("value", value);
            onSelectedUserChange(null);
          }
          debouncedSearchUsers(value);
        }}
        onSelectedValue={(value: ComboValue | null) => {
          onSelectedUserChange(
            users.find((user) => user.id === value?.value) || null,
          );
        }}
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
