import { InertiaFormProps } from "@inertiajs/react";
import { useState, useEffect, useRef } from "react";
import { RecipeFormType } from "@customTypes/recipe.types";
import { Card, Input, Button, Badge } from "@components/ui";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useTextTypeDetection } from "@hooks/useTextTypeDetection";

// Types
type ItemType = "ingredient" | "instruction";

interface SortableItemProps {
  form: InertiaFormProps<RecipeFormType>;
  item: string;
  itemIndex: number;
  type: ItemType;
}

// Composant pour un élément glissable (ingrédient ou instruction)
function SortableItem({ type, item, itemIndex, form }: SortableItemProps) {
  const id = `${type}-${itemIndex}`;
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [active, setActive] = useState(false);

  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useSortable({ id });

  // Style pour les différents types d'éléments
  const bgColorClass =
    type === "ingredient"
      ? "border-primary-100 bg-primary-50 hover:bg-primary-100"
      : "border-secondary-200 bg-secondary-100 hover:bg-secondary-200";

  // Style pour le drag and drop
  const style = {
    transform: CSS.Transform.toString(transform),
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 1 : 0,
  };

  // Fonction pour ajuster automatiquement la hauteur du textarea
  const adjustTextareaHeight = (element: HTMLTextAreaElement | null) => {
    if (!element) return;
    element.style.height = "auto";
    element.style.height = `${element.scrollHeight}px`;
  };

  // Fonction pour supprimer un élément
  const deleteItem = () => {
    if (type === "ingredient") {
      form.setData(
        "ingredients",
        form.data.ingredients?.filter((_, i) => i !== itemIndex) ?? null
      );
    } else {
      form.setData(
        "instructions",
        form.data.instructions?.filter((_, i) => i !== itemIndex) ?? null
      );
    }
  };

  // Fonction pour mettre à jour un élément
  const updateItem = (value: string) => {
    if (type === "ingredient") {
      const newIngredients = [...(form.data.ingredients || [])];
      newIngredients[itemIndex] = value;
      form.setData("ingredients", newIngredients);
    } else {
      const newInstructions = [...(form.data.instructions || [])];
      newInstructions[itemIndex] = value;
      form.setData("instructions", newInstructions);
    }
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

  const handleClick = () => {
    if (isDragging) return;
    setActive(true);
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    deleteItem();
  };

  const handleBlur = () => {
    if (item.trim() === "") {
      deleteItem();
    }
    setActive(false);
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="flex items-center gap-2"
    >
      <div
        className={`flex-1 flex items-start justify-between p-2 rounded-lg border transition-colors cursor-grab ${bgColorClass}`}
        {...listeners}
      >
        <textarea
          ref={textareaRef}
          value={item}
          disabled={isDragging}
          onClick={handleClick}
          onChange={handleChange}
          onBlur={handleBlur}
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
    </li>
  );
}

// Composant pour la liste d'items (ingrédients ou instructions)
function ItemList({
  type,
  items,
  form,
  onDragEnd,
}: {
  type: ItemType;
  items: string[] | null;
  form: InertiaFormProps<RecipeFormType>;
  onDragEnd: (event: DragEndEvent) => void;
}) {
  const badgeVariant = type === "ingredient" ? "primary" : "secondary";
  const title = type === "ingredient" ? "Ingrédients" : "Instructions";
  const emptyMessage =
    type === "ingredient"
      ? "Aucun ingrédient ajouté"
      : "Aucune instruction ajoutée";

  return (
    <Card variant="flat">
      <Card.Header>
        <h2 className="text-xl font-semibold text-neutral-800 flex gap-2">
          {title}
          <Badge variant={badgeVariant}>{items?.length || 0}</Badge>
        </h2>
        {items && items.length > 1 && (
          <p className="text-xs text-neutral-500 mt-1 flex items-center gap-1">
            <span className="material-symbols-outlined material-icon--sm">
              pan_tool
            </span>
            Glissez-déposez pour réorganiser les{" "}
            {type === "ingredient" ? "ingrédients" : "instructions"}
          </p>
        )}
      </Card.Header>
      <Card.Body className={`${type === "ingredient" ? "space-y-2" : ""}`}>
        {!items?.length ? (
          <div
            className={`text-center py-6 ${
              type === "instruction" ? "h-full" : ""
            } bg-neutral-50 rounded-lg border border-neutral-100`}
          >
            <p className="text-neutral-600">{emptyMessage}</p>
            <p className="text-neutral-500 text-sm mt-1">
              Utilisez le champ ci-dessus pour ajouter des{" "}
              {type === "ingredient" ? "ingrédients" : "instructions"}
            </p>
          </div>
        ) : (
          <DndContext
            sensors={useSensors(
              useSensor(PointerSensor, {
                activationConstraint: { distance: 8 },
              })
            )}
            collisionDetection={closestCenter}
            onDragEnd={onDragEnd}
            modifiers={[restrictToVerticalAxis]}
          >
            <SortableContext
              items={items.map((_, index) => `${type}-${index}`)}
              strategy={verticalListSortingStrategy}
            >
              {type === "ingredient" ? (
                <ul className="space-y-2">
                  {items.map((item, index) => (
                    <SortableItem
                      key={`${type}-${index}`}
                      item={item}
                      type={type}
                      itemIndex={index}
                      form={form}
                    />
                  ))}
                </ul>
              ) : (
                <ol className="space-y-2 list-none pl-0">
                  {items.map((item, index) => (
                    <SortableItem
                      key={`${type}-${index}`}
                      item={item}
                      type={type}
                      itemIndex={index}
                      form={form}
                    />
                  ))}
                </ol>
              )}
            </SortableContext>
          </DndContext>
        )}
      </Card.Body>
    </Card>
  );
}

// Composant principal
export default function RecipeIngredientInstructionsForm({
  form,
}: {
  form: InertiaFormProps<RecipeFormType>;
}) {
  const { inputText, setInputText, detectedType, isIngredient, isInstruction } =
    useTextTypeDetection();

  // Fonction pour ajouter du texte à la liste appropriée
  const addTextToList = (text: string) => {
    if (!text.trim()) return;

    if (isIngredient(text)) {
      form.setData("ingredients", [...(form.data.ingredients || []), text]);
      setInputText("");
      return "ingredient";
    } else if (isInstruction(text)) {
      form.setData("instructions", [...(form.data.instructions || []), text]);
      setInputText("");
      return "instruction";
    } else {
      // Si pas de détection automatique, laisser l'utilisateur choisir
      if (
        window.confirm(
          "Voulez-vous ajouter ce texte comme un ingrédient? Cliquez sur Annuler pour l'ajouter comme instruction."
        )
      ) {
        form.setData("ingredients", [...(form.data.ingredients || []), text]);
        setInputText("");
        return "ingredient";
      } else {
        form.setData("instructions", [...(form.data.instructions || []), text]);
        setInputText("");
        return "instruction";
      }
    }
  };

  // Gestionnaires d'événements
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputText.trim()) {
      addTextToList(inputText.trim());
    }
  };

  const addManually = (type: ItemType) => {
    if (!inputText.trim()) return;

    // Forcer l'ajout dans la liste spécifiée
    form.setData(type === "ingredient" ? "ingredients" : "instructions", [
      ...(form.data[type === "ingredient" ? "ingredients" : "instructions"] ||
        []),
      inputText.trim(),
    ]);
    setInputText("");
  };

  // Gestion du drag and drop
  const handleDragEnd = (type: ItemType) => (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = parseInt(active.id.toString().split("-")[1]);
      const newIndex = parseInt(over.id.toString().split("-")[1]);

      const items = [
        ...(form.data[type === "ingredient" ? "ingredients" : "instructions"] ||
          []),
      ];
      const reorderedItems = arrayMove(items, oldIndex, newIndex);

      form.setData(
        type === "ingredient" ? "ingredients" : "instructions",
        reorderedItems
      );
    }
  };

  return (
    <>
      <Card>
        <Card.Header>
          <h2 className="text-xl font-semibold text-neutral-800 flex items-center gap-1">
            <span className="material-symbols-outlined text-primary-600">
              grocery
            </span>
            Ingrédients et instructions
          </h2>
        </Card.Header>
        <Card.Body className="space-y-4">
          <div className="flex flex-col">
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="flex-grow">
                <Input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ex: 2 oeufs, cuire la viande pendant 1h, etc."
                  className={
                    detectedType === "ingredient"
                      ? "border-primary-500 bg-primary-50"
                      : detectedType === "instruction"
                      ? "border-secondary-500 bg-secondary-50"
                      : ""
                  }
                />
              </div>

              <div className="flex gap-2">
                <Button
                  variant="primary"
                  size="md"
                  onClick={(e) => {
                    e.preventDefault();
                    addManually("ingredient");
                  }}
                  icon={<span className="material-symbols-outlined">add</span>}
                >
                  Ingrédient
                </Button>
                <Button
                  variant="secondary"
                  size="md"
                  onClick={(e) => {
                    e.preventDefault();
                    addManually("instruction");
                  }}
                  icon={<span className="material-symbols-outlined">add</span>}
                >
                  Instruction
                </Button>
              </div>
            </div>

            {inputText.trim() && (
              <div className="mt-2">
                {detectedType === "ingredient" ? (
                  <Badge variant="primary" size="md">
                    Détecté comme ingrédient - Appuyez sur Entrée pour ajouter
                  </Badge>
                ) : detectedType === "instruction" ? (
                  <Badge variant="secondary" size="md">
                    Détecté comme instruction - Appuyez sur Entrée pour ajouter
                  </Badge>
                ) : (
                  <Badge variant="neutral" size="md">
                    Type non détecté - Appuyez sur Entrée ou utilisez les
                    boutons
                  </Badge>
                )}
              </div>
            )}

            <ul className="text-sm text-neutral-600 mt-2">
              <li className="flex items-start gap-2">
                <span className="material-symbols-outlined text-primary-600">
                  check
                </span>
                <span>
                  Les <strong>ingrédients</strong> contiennent généralement des
                  quantités (ex: "2 oeufs", "200g de farine", "une pincée de
                  sel")
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="material-symbols-outlined text-secondary-600">
                  check
                </span>
                <span>
                  Les <strong>instructions</strong> commencent souvent par un
                  verbe d'action (ex: "Mélanger les ingrédients", "Cuire pendant
                  10 minutes")
                </span>
              </li>
            </ul>
          </div>
        </Card.Body>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
          <ItemList
            type="ingredient"
            items={form.data.ingredients}
            form={form}
            onDragEnd={handleDragEnd("ingredient")}
          />
          <ItemList
            type="instruction"
            items={form.data.instructions}
            form={form}
            onDragEnd={handleDragEnd("instruction")}
          />
        </div>
      </Card>
    </>
  );
}
