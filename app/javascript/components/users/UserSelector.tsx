import { useState, useEffect } from "react";
import axios from "axios";
import Combo from "../ui/Combo";

interface User {
  id: number;
  username: string;
  email: string;
}

interface UserSelectorProps {
  onUserSelected: (userId: number | null, user: User | null) => void;
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
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

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
  const userOptions = users.map((user) => `${user.username} (${user.email})`);

  // Gérer la sélection d'un utilisateur
  const handleUserSelected = (selectedValue: string) => {
    const index = userOptions.findIndex((option) => option === selectedValue);
    if (index !== -1) {
      const user = users[index];
      setSelectedUser(user);
      onUserSelected(user.id, user);
    } else {
      setSelectedUser(null);
      onUserSelected(null, null);
    }
  };

  // Formater la valeur sélectionnée pour l'affichage
  const displayValue = selectedUser
    ? `${selectedUser.username} (${selectedUser.email})`
    : "";

  return (
    <div className={className}>
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
      <Combo
        className="flex-1"
        values={userOptions}
        onSelectedValue={handleUserSelected}
        placeholder={isLoading ? "Chargement des utilisateurs..." : placeholder}
        label={label}
        value={displayValue}
        disabled={isLoading || users.length === 0}
      />
    </div>
  );
}
