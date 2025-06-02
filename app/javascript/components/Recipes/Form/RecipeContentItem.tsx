import { Button } from "@components/ui";
import { RecipeItem } from "@customTypes/recipe.types";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useEffect, useRef, useState } from "react";

export default function RecipeContentItem({
  item,
  onUpdate,
  onDelete,
}: {
  item: RecipeItem;
  onUpdate?: (id: string, value: string) => void;
  onDelete?: (id: string) => void;
}) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [active, setActive] = useState(false);

  const bgColorClass =
    item.type === "ingredient"
      ? "border-primary-100 bg-primary-50 hover:bg-primary-100"
      : "border-secondary-200 bg-secondary-100 hover:bg-secondary-200";

  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: item.id,
      data: {
        type: item.type,
      },
    });

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 1 : 0,
  };

  const adjustTextareaHeight = (element: HTMLTextAreaElement | null) => {
    if (!element) return;
    element.style.height = "auto";
    element.style.height = `${element.scrollHeight}px`;
  };

  // Fonction pour supprimer un élément
  const deleteItem = () => {
    onDelete?.(item.id);
  };

  // Fonction pour mettre à jour un élément
  const updateItem = (value: string) => {
    onUpdate?.(item.id, value);
    adjustTextareaHeight(textareaRef.current);
  };

  // Ajuster la hauteur au montage et quand l'élément change
  useEffect(() => {
    adjustTextareaHeight(textareaRef.current);
  }, [item]);

  // Gestionnaires d'événements
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateItem(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      textareaRef.current?.blur();
    }
  };

  const handleClick = () => {
    if (isDragging) return;
    setActive(true);
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    deleteItem();
  };

  const handleBlur = () => {
    if (item.value.trim() === "") {
      deleteItem();
    }
    setActive(false);
  };

  return (
    <div
      className={`flex-1 flex items-start justify-between p-1 rounded-lg border transition-colors cursor-grab touch-manipulation ${bgColorClass}`}
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
    >
      <textarea
        ref={textareaRef}
        value={item.value}
        disabled={isDragging}
        onClick={handleClick}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        rows={1}
        className={`${
          active ? "bg-white focus:ring-2" : "ring-0"
        } text-neutral-800 w-full self-center bg-transparent border-none rounded-sm resize-none overflow-hidden`}
        style={{ minHeight: "24px" }}
      />
      <Button
        variant="ghost"
        size="sm"
        onClick={handleDelete}
        className="text-red-600 hover:text-red-700"
      >
        <span className="material-symbols-outlined">delete</span>
      </Button>
    </div>
  );
}
