import { InertiaFormProps } from "@inertiajs/react";
import { useState, useEffect } from "react";
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

// Type pour les éléments de la recette
type DetectionType = "ingredient" | "instruction" | "unknown";

// Composant pour un élément glissable (ingrédient ou instruction)
interface SortableItemProps {
  form: InertiaFormProps<RecipeFormType>;
  item: string;
  itemIndex: number;
  type: "ingredient" | "instruction";
}

//TODO: cleanup the mess in that component

function SortableItem({ type, item, itemIndex, form }: SortableItemProps) {
  const id = `${type}-${itemIndex}`;

  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useSortable({ id });

  const [active, setActive] = useState(false);

  const style = {
    transform: CSS.Transform.toString(transform),
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 1 : 0,
  };

  const bgColorClass =
    type === "ingredient"
      ? "border-primary-100 bg-primary-50 hover:bg-primary-100"
      : "border-secondary-200 bg-secondary-100 hover:bg-secondary-200";

  const deleteItem = (index: number, type: "ingredient" | "instruction") => {
    if (type === "ingredient") {
      form.setData(
        "ingredients",
        form.data.ingredients?.filter((_, i) => i !== index) ?? null
      );
    } else {
      form.setData(
        "instructions",
        form.data.instructions?.filter((_, i) => i !== index) ?? null
      );
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (type === "ingredient") {
      const newIngredients = [...form.data.ingredients!];
      newIngredients[itemIndex] = e.target.value;
      form.setData("ingredients", newIngredients);
    } else {
      const newInstructions = [...form.data.instructions!];
      newInstructions[itemIndex] = e.target.value;
      form.setData("instructions", newInstructions);
    }
  };

  const handleClick = () => {
    if (isDragging) return;
    setActive(true);
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    deleteItem(itemIndex, type);
  };

  const handleBlur = () => {
    if (item.trim() === "") {
      deleteItem(itemIndex, type);
    }
    setActive(false);
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      className={`flex items-center gap-2`}
    >
      <div
        className={`flex-1 flex items-start justify-between p-2 rounded-lg border transition-colors cursor-grab ${bgColorClass}`}
        {...listeners}
      >
        <input
          type="text"
          value={item}
          disabled={isDragging}
          onClick={handleClick}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`${
            active ? "bg-white focus:ring-2" : "ring-0"
          } text-neutral-800 w-full self-center bg-transparent border-none rounded-sm`}
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

export default function RecipeIngredientInstructionsForm({
  form,
}: {
  form: InertiaFormProps<RecipeFormType>;
}) {
  const [inputText, setInputText] = useState<string>("");
  const [detectedType, setDetectedType] = useState<DetectionType>("unknown");

  // Configuration des capteurs pour le drag and drop
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // Minimum distance before drag starts (in pixels)
      },
    })
  );

  // Expressions régulières pour détecter les types de contenu
  const isIngredient = (text: string) => {
    // Détecte les motifs comme "2 oeufs", "200g de farine", "une pincée de sel", etc.

    // Motif pour les quantités numériques avec unités optionnelles
    const numericPattern =
      /^\s*(\d+[.,]?\d*)\s*([a-zÀ-ÿ]+)?\s+(de\s+)?[a-zÀ-ÿ\s]+$/i;

    // Motif pour les quantités textuelles comme "une pincée de", "quelques feuilles de"
    const textualQuantityPattern =
      /^\s*(une|un|des|quelques|plusieurs|demi|demie|quart|tiers)\s+[a-zÀ-ÿ\s]+(de\s+)?[a-zÀ-ÿ\s]+$/i;

    // Motif pour les ingrédients simples sans quantité comme "sel", "poivre"
    const simpleIngredientPattern = /^\s*[a-zÀ-ÿ]{1,15}$/i;

    // Vérifier si le texte correspond à l'un des motifs d'ingrédients
    return (
      numericPattern.test(text) ||
      textualQuantityPattern.test(text) ||
      simpleIngredientPattern.test(text)
    );
  };

  const isInstruction = (text: string) => {
    // Détecte les instructions culinaires avec des verbes d'action
    const actionVerbs = [
      // Verbes de préparation
      "mélanger",
      "ajouter",
      "mettre",
      "verser",
      "incorporer",
      "battre",
      "remuer",
      "pétrir",
      "couper",
      "hacher",
      "émincer",
      "trancher",
      "râper",
      "peler",
      "éplucher",
      "mélangez",
      "ajoutez",
      "mettez",
      "versez",
      "incorporez",
      "battez",
      "remuez",
      "pétrissez",
      "coupez",
      "hachez",
      "émincez",
      "tranchez",
      "râpez",
      "pelez",
      "épluchez",

      // Verbes de cuisson
      "cuire",
      "chauffer",
      "préchauffer",
      "mijoter",
      "bouillir",
      "sauter",
      "frire",
      "griller",
      "rôtir",
      "flamber",
      "cuisez",
      "chauffez",
      "préchauffez",
      "mijotez",
      "faites bouillir",
      "sautez",
      "faites frire",
      "grillez",
      "rôtissez",
      "flambez",

      // Verbes de finalisation
      "laisser",
      "réserver",
      "assaisonner",
      "saler",
      "poivrer",
      "laissez",
      "réservez",
      "assaisonnez",
      "salez",
      "poivrez",
      "garnir",
      "garnissez",
      "servir",
      "servez",
      "dresser",
      "dressez",
      "décorez",
      "décorer",

      // Autres verbes culinaires
      "filtrer",
      "filtrez",
      "tamiser",
      "tamisez",
      "fouetter",
      "fouettez",
      "plonger",
      "plongez",
      "retirer",
      "retirez",
      "déposer",
      "déposez",
      "étaler",
      "étalez",
      "former",
      "formez",
      "façonner",
      "façonnez",
      "disposer",
      "disposez",
      "placer",
      "placez",
      "couvrir",
      "couvrez",
    ];

    // Vérifier si le texte contient un verbe d'action culinaire
    const containsActionVerb = actionVerbs.some((verb) =>
      new RegExp(`\\b${verb}\\b`, "i").test(text)
    );

    // Vérifier si le texte commence par un verbe à l'impératif ou à l'infinitif
    const startsWithVerb = actionVerbs.some((verb) =>
      new RegExp(`^\\s*${verb}\\b`, "i").test(text)
    );

    // Vérifier si le texte contient des indicateurs temporels typiques des instructions
    const containsTimeIndicator =
      /\b(pendant|durant|minutes?|heures?|secondes?|min|h|jusqu'à|jusqu'a)\b/i.test(
        text
      );

    // Vérifier si le texte est une phrase complète (plus de 3 mots et plus de 15 caractères)
    const isFullSentence = text.split(/\s+/).length > 3 && text.length > 15;

    return (
      (containsActionVerb && (startsWithVerb || isFullSentence)) ||
      (startsWithVerb && (containsTimeIndicator || isFullSentence))
    );
  };

  // Détecte le type de texte en temps réel
  useEffect(() => {
    if (!inputText.trim()) {
      setDetectedType("unknown");
      return;
    }

    const text = inputText.trim();

    if (isIngredient(text)) {
      setDetectedType("ingredient");
    } else if (isInstruction(text)) {
      setDetectedType("instruction");
    } else {
      setDetectedType("unknown");
    }
  }, [inputText]);

  // Détermine le type de texte et l'ajoute à la liste appropriée
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputText.trim()) {
      addTextToList(inputText.trim());
    }
  };

  const addManually = (type: "ingredient" | "instruction") => {
    if (!inputText.trim()) return;

    // Forcer l'ajout dans la liste spécifiée, indépendamment de la détection
    if (type === "ingredient") {
      form.setData("ingredients", [
        ...(form.data.ingredients || []),
        inputText.trim(),
      ]);
    } else {
      form.setData("instructions", [
        ...(form.data.instructions || []),
        inputText.trim(),
      ]);
    }

    setInputText("");
  };

  // Gestion du drag and drop pour les ingrédients
  const handleDragEndIngredients = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = parseInt(active.id.toString().split("-")[1]);
      const newIndex = parseInt(over.id.toString().split("-")[1]);

      const ingredients = [...(form.data.ingredients || [])];
      const reorderedIngredients = arrayMove(ingredients, oldIndex, newIndex);

      form.setData("ingredients", reorderedIngredients);
    }
  };

  // Gestion du drag and drop pour les instructions
  const handleDragEndInstructions = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = parseInt(active.id.toString().split("-")[1]);
      const newIndex = parseInt(over.id.toString().split("-")[1]);

      const instructions = [...(form.data.instructions || [])];
      const reorderedInstructions = arrayMove(instructions, oldIndex, newIndex);

      form.setData("instructions", reorderedInstructions);
    }
  };

  return (
    <>
      <Card variant="outlined">
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
          <Card variant="flat">
            <Card.Header>
              <h2 className="text-xl font-semibold text-neutral-800 flex gap-2">
                Ingrédients
                <Badge variant="primary">
                  {form.data.ingredients?.length || 0}
                </Badge>
              </h2>
              {form.data.ingredients && form.data.ingredients.length > 1 && (
                <p className="text-xs text-neutral-500 mt-1 flex items-center gap-1">
                  <span className="material-symbols-outlined material-icon--sm">
                    pan_tool
                  </span>
                  Glissez-déposez pour réorganiser les ingrédients
                </p>
              )}
            </Card.Header>
            <Card.Body className="space-y-2">
              {!form.data.ingredients?.length ? (
                <div className="text-center py-6 bg-neutral-50 rounded-lg border border-neutral-100">
                  <p className="text-neutral-600">Aucun ingrédient ajouté</p>
                  <p className="text-neutral-500 text-sm mt-1">
                    Utilisez le champ ci-dessus pour ajouter des ingrédients
                  </p>
                </div>
              ) : (
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={handleDragEndIngredients}
                  modifiers={[restrictToVerticalAxis]}
                >
                  <SortableContext
                    items={(form.data.ingredients || []).map(
                      (_, index) => `ingredient-${index}`
                    )}
                    strategy={verticalListSortingStrategy}
                  >
                    <ul className="space-y-2">
                      {(form.data.ingredients || []).map((item, index) => (
                        <SortableItem
                          key={`ingredient-${index}`}
                          item={item}
                          type="ingredient"
                          itemIndex={index}
                          form={form}
                        />
                      ))}
                    </ul>
                  </SortableContext>
                </DndContext>
              )}
            </Card.Body>
          </Card>
          <Card variant="flat">
            <Card.Header>
              <h2 className="text-xl font-semibold text-neutral-800 flex gap-2">
                Instructions
                <Badge variant="secondary">
                  {form.data.instructions?.length || 0}
                </Badge>
              </h2>
              {form.data.instructions && form.data.instructions.length > 1 && (
                <p className="text-xs text-neutral-500 mt-1 flex items-center gap-1">
                  <span className="material-symbols-outlined material-icon--sm">
                    pan_tool
                  </span>
                  Glissez-déposez pour réorganiser les instructions
                </p>
              )}
            </Card.Header>
            <Card.Body>
              {!form.data.instructions?.length ? (
                <div className="text-center py-6 bg-neutral-50 rounded-lg border border-neutral-100">
                  <p className="text-neutral-600">Aucune instruction ajoutée</p>
                  <p className="text-neutral-500 text-sm mt-1">
                    Utilisez le champ ci-dessus pour ajouter des instructions
                  </p>
                </div>
              ) : (
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={handleDragEndInstructions}
                >
                  <SortableContext
                    items={(form.data.instructions || []).map(
                      (_, index) => `instruction-${index}`
                    )}
                    strategy={verticalListSortingStrategy}
                  >
                    <ol className="space-y-2 list-none pl-0">
                      {(form.data.instructions || []).map((item, index) => (
                        <SortableItem
                          key={`instruction-${index}`}
                          item={item}
                          type="instruction"
                          itemIndex={index}
                          form={form}
                        />
                      ))}
                    </ol>
                  </SortableContext>
                </DndContext>
              )}
            </Card.Body>
          </Card>
        </div>
      </Card>
    </>
  );
}
