import { Button, Input } from "@components/ui";
import EmptyPlaceholder from "@components/ui/EmptyPlaceholder";
import { ItemType, RecipeItem } from "@customTypes/recipe.types";
import { useState, useRef, useEffect } from "react";
import RecipeContentItem from "./RecipeContentItem";
import { useDroppable } from "@dnd-kit/core";

export default function CategoryItem({
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
      className={`rounded-lg p-2 ${
        isOver ? "border-2 border-primary-500" : ""
      }`}
      style={{ backgroundColor: color }}
    >
      {isEditing ? (
        <Input
          ref={inputRef}
          type="text"
          value={editName}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          onBlur={handleInputBlur}
          inputClassName="p-1!"
          containerClassName="mb-2"
        />
      ) : (
        <div className="flex justify-between items-start">
          <h3
            className={`text-neutral-600 text-sm mb-2 ${
              onNameChange && !defaultCategory
                ? "cursor-pointer hover:text-neutral-800 transition-colors"
                : ""
            }`}
            onClick={handleTitleClick}
            title={onNameChange ? "Cliquer pour modifier le nom" : undefined}
          >
            {`${name || "Sans catégorie"} (${items.length})`}
          </h3>
          {!defaultCategory && (
            <Button
              variant="ghost"
              className="p-0! text-red-600 hover:text-red-700"
              onClick={handleDelete}
            >
              <span className="material-symbols-outlined">delete</span>
            </Button>
          )}
        </div>
      )}
      {items.length === 0 ? (
        <EmptyPlaceholder
          variant="outline"
          text="Aucun élément dans cette catégorie"
        />
      ) : (
        <ul className="list-disc pl-5">
          {items.map((item) => (
            <RecipeContentItem
              key={item.id}
              item={item}
              onUpdate={onItemUpdate}
              onDelete={onItemDelete}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
