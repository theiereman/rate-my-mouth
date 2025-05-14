import { useState, useEffect } from "react";
import axios from "axios";
import { Combo, ComboValue } from "@components/ui";

interface User {
  id: number;
  username: string;
  email: string;
}

interface UserSelectorProps {
  onUserSelected: (userId: number | null) => void;
  label?: string;
  placeholder?: string;
  className?: string;
  initialUserId?: number;
}

export default function UserSelector({
  onUserSelected,
  label = "",
  placeholder = "Sélectionner un utilisateur...",
  className = "",
  initialUserId,
}: UserSelectorProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<number | null>(null);

  // Charger la liste des utilisateurs
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("/users/list");
        setUsers(response.data);

        // Si un ID initial est fourni, trouver l'utilisateur correspondant
        if (initialUserId) {
          const initialUser = response.data.find(
            (user: User) => user.id === initialUserId
          );
          if (initialUser) {
            setSelectedUser(initialUser);
          }
        }
      } catch (err) {
        setError("Erreur lors du chargement des utilisateurs");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, [initialUserId]);

  // Formater les utilisateurs pour l'affichage dans la combo
  const userOptions: ComboValue[] = users.map<ComboValue>((user) => {
    return { value: user.id, label: user.username };
  });

  // Gérer la sélection d'un utilisateur
  const handleUserSelected = (selectedValue: ComboValue | null) => {
    setSelectedUser(selectedValue?.value ?? null);
    onUserSelected(selectedValue?.value ?? null);
  };

  return (
    <div className={className}>
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
      <Combo
        className="flex-1"
        values={userOptions}
        onSelectedValue={handleUserSelected}
        placeholder={isLoading ? "Chargement des utilisateurs..." : placeholder}
        label={label}
        value={selectedUser}
        disabled={isLoading || users.length === 0}
        erasable
      />
    </div>
  );
}
