import { Button } from "@components/ui";
import { RecipeItem } from "@customTypes/recipe.types";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useEffect, useRef, useState } from "react";

export default function RecipeContentFormItem({
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
      className={`border-primary-900 flex flex-1 cursor-grab touch-manipulation items-center justify-between border-1 p-1`}
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
    >
      <span className="material-symbols-outlined">drag_indicator</span>
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
          active ? "ring-accent-600 bg-white focus:ring-2" : "ring-0"
        } w-full resize-none self-center overflow-hidden border-none bg-transparent text-neutral-800`}
        style={{ minHeight: "24px" }}
      />
      <Button
        variant="ghost"
        onClick={handleDelete}
        className="ms-2 text-red-600"
      >
        <span className="material-symbols-outlined">delete</span>
      </Button>
    </div>
  );
}
