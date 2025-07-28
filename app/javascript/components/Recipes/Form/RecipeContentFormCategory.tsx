import { Button, Input } from "@components/ui";
import { EmptyPlaceholder } from "@components/ui";
import { ItemType, RecipeItem } from "@customTypes/recipe.types";
import { useState, useRef, useEffect } from "react";
import { useDroppable } from "@dnd-kit/core";
import RecipeContentFormItem from "./RecipeContentFormItem";

export default function RecipeContentFormCategory({
  name,
  type,
  items,
  color,
  onNameChange,
  onDelete,
  onItemUpdate,
  onItemDelete,
}: {
  name: string;
  type: ItemType;
  items: RecipeItem[];
  color?: string;
  onNameChange?: (newName: string) => void;
  onDelete?: () => void;
  onItemUpdate?: (id: string, value: string) => void;
  onItemDelete?: (id: string) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(name);
  const inputRef = useRef<HTMLInputElement>(null);

  const { isOver, setNodeRef } = useDroppable({
    id: `${name}-${type}`,
    data: {
      name,
      type,
    },
  });

  const defaultCategory = name === "";

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleTitleClick = () => {
    if (onNameChange && !defaultCategory) {
      setIsEditing(true);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditName(e.target.value);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleInputSave();
    } else if (e.key === "Escape") {
      handleInputCancel();
    }
  };

  const handleInputBlur = () => {
    handleInputSave();
  };

  const handleInputSave = () => {
    const trimmedName = editName.trim();
    if (trimmedName && trimmedName !== name && onNameChange) {
      onNameChange(trimmedName);
    } else {
      setEditName(name); // Reset to original name if empty or unchanged
    }
    setIsEditing(false);
  };

  const handleInputCancel = () => {
    setEditName(name);
    setIsEditing(false);
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onDelete && onDelete();
  };

  return (
    <div
      ref={setNodeRef}
      className={`py-2 ${isOver ? "border-accent-500 border-3 p-2" : ""}`}
      style={{ backgroundColor: color }}
    >
      {isEditing ? (
        <div>
          <Input
            ref={inputRef}
            value={editName}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
            onBlur={handleInputBlur}
          />
        </div>
      ) : (
        !defaultCategory && (
          <div className="flex items-start justify-between">
            <h3
              className={`mb-2 line-clamp-1 font-bold text-ellipsis text-neutral-600 ${
                onNameChange && !defaultCategory
                  ? "cursor-pointer transition-colors hover:text-neutral-800"
                  : ""
              }`}
              onClick={handleTitleClick}
              title={onNameChange ? "Cliquer pour modifier le nom" : undefined}
            >
              {`${name || "Sans catégorie"} (${items.length})`}
            </h3>
            <Button
              variant="ghost"
              className="p-0! text-red-600 opacity-40 hover:text-red-700 hover:opacity-100"
              onClick={handleDelete}
            >
              Supprimer
            </Button>
          </div>
        )
      )}
      {items.length === 0 ? (
        <EmptyPlaceholder className="border-1 p-2">
          Aucun élément dans cette catégorie
        </EmptyPlaceholder>
      ) : (
        <div className="space-y-2">
          {items.map((item) => (
            <RecipeContentFormItem
              key={item.id}
              item={item}
              onUpdate={onItemUpdate}
              onDelete={onItemDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
