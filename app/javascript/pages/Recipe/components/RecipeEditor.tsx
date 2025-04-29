import { InertiaFormProps } from "@inertiajs/react";
import { useState, useRef, useEffect } from "react";
import { RecipeFormType } from "../types";

interface Item {
  id: number;
  text: string;
}

interface EditingItem extends Item {
  type: "ingredient" | "instruction";
}

type DetectionType = "ingredient" | "instruction" | "unknown";

export default function RecipeEditor({
  form,
}: {
  form: InertiaFormProps<RecipeFormType>;
}) {
  const [inputText, setInputText] = useState<string>("");
  const [detectedType, setDetectedType] = useState<DetectionType>("unknown");
  const inputRef = useRef<HTMLInputElement>(null);

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
      form.setData("ingredients", [...form.data.ingredients, text]);
      setInputText("");
      return "ingredient";
    } else if (isInstruction(text)) {
      form.setData("instructions", [...form.data.instructions, text]);
      setInputText("");
      return "instruction";
    } else {
      // Si pas de détection automatique, laisser l'utilisateur choisir
      if (
        window.confirm(
          "Voulez-vous ajouter ce texte comme un ingrédient? Cliquez sur Annuler pour l'ajouter comme instruction."
        )
      ) {
        form.setData("ingredients", [...form.data.ingredients, text]);
        setInputText("");
        return "ingredient";
      } else {
        form.setData("instructions", [...form.data.instructions, text]);
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
      form.setData("ingredients", [...form.data.ingredients, inputText.trim()]);
    } else {
      form.setData("instructions", [
        ...form.data.instructions,
        inputText.trim(),
      ]);
    }

    setInputText("");
  };

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

  return (
    <>
      <div className="mb-6">
        <label className="block mb-2 font-semibold">
          Saisissez votre texte:
        </label>
        <div className="flex flex-col">
          <div className="flex">
            <input
              ref={inputRef}
              type="text"
              className={`flex-grow p-2 border rounded ${
                detectedType === "ingredient"
                  ? "border-blue-500 bg-blue-50"
                  : detectedType === "instruction"
                  ? "border-purple-500 bg-purple-50"
                  : ""
              }`}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ex: 2 oeufs, cuire la viande pendant 1h, etc."
            />

            <div className="flex ml-2">
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-600"
                onClick={(e) => {
                  e.preventDefault();
                  addManually("ingredient");
                }}
              >
                + Ingrédient
              </button>
              <button
                className="bg-purple-500 text-white px-3 py-1 rounded hover:bg-purple-600"
                onClick={(e) => {
                  e.preventDefault();
                  addManually("instruction");
                }}
              >
                + Instruction
              </button>
            </div>
          </div>

          {inputText.trim() && (
            <div className="mt-2 text-sm">
              {detectedType === "ingredient" ? (
                <div className="text-blue-600">
                  <span className="font-semibold">
                    Détecté comme ingrédient
                  </span>{" "}
                  - Appuyez sur Entrée pour ajouter
                </div>
              ) : detectedType === "instruction" ? (
                <div className="text-purple-600">
                  <span className="font-semibold">
                    Détecté comme instruction
                  </span>{" "}
                  - Appuyez sur Entrée pour ajouter
                </div>
              ) : (
                <div className="text-gray-600">
                  Type non détecté - Appuyez sur Entrée pour choisir
                  manuellement ou utilisez les boutons
                </div>
              )}
            </div>
          )}

          <p className="text-sm text-gray-600 mt-2">
            <span className="font-semibold">Astuces:</span>
            <ul className="list-disc pl-5 mt-1">
              <li>
                Les ingrédients contiennent généralement des quantités (ex: "2
                oeufs", "200g de farine", "une pincée de sel")
              </li>
              <li>
                Les instructions commencent souvent par un verbe d'action (ex:
                "Mélanger les ingrédients", "Cuire pendant 10 minutes")
              </li>
            </ul>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Liste des ingrédients */}
        <div className="border rounded p-4">
          <h2 className="text-xl font-bold mb-3">Ingrédients</h2>
          {form.data.ingredients.length === 0 ? (
            <p className="text-gray-500 italic">Aucun ingrédient ajouté</p>
          ) : (
            <ul className="space-y-2">
              {form.data.ingredients.map((item) => (
                <li
                  key={item}
                  className="flex items-center justify-between bg-blue-50 p-2 rounded"
                >
                  <span>{item}</span>
                  <div>
                    <button
                      className="text-red-600 hover:text-red-800"
                      onClick={() =>
                        deleteItem(
                          form.data.ingredients.indexOf(item),
                          "ingredient"
                        )
                      }
                    >
                      Supprimer
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Liste des instructions */}
        <div className="border rounded p-4">
          <h2 className="text-xl font-bold mb-3">Instructions</h2>
          {form.data.instructions.length === 0 ? (
            <p className="text-gray-500 italic">Aucune instruction ajoutée</p>
          ) : (
            <ol className="space-y-2 list-decimal pl-5">
              {form.data.instructions.map((item) => (
                <li key={item} className="bg-purple-50 p-2 rounded ml-0 pl-0">
                  <div className="flex items-center justify-between">
                    <span>{item}</span>
                    <div>
                      <button
                        className="text-red-600 hover:text-red-800"
                        onClick={() =>
                          deleteItem(
                            form.data.instructions.indexOf(item),
                            "instruction"
                          )
                        }
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          )}
        </div>
      </div>
    </>
  );
}
