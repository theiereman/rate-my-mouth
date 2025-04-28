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

export default function RecipeEditor({
  form,
}: {
  form: InertiaFormProps<RecipeFormType>;
}) {
  const [inputText, setInputText] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Expressions régulières pour détecter les types de contenu
  const isIngredient = (text: string) => {
    // Détecte les motifs comme "2 oeufs", "200g de farine", etc.
    return /^\s*\d+(\.\d+)?(\s*[a-zÀ-ÿ]+)?\s+(de\s+)?[a-zÀ-ÿ\s]+$/i.test(text);
  };

  const isInstruction = (text: string) => {
    // Détecte les instructions culinaires avec des verbes d'action
    const actionVerbs = [
      "mélanger",
      "ajouter",
      "mettre",
      "cuire",
      "verser",
      "incorporer",
      "battre",
      "remuer",
      "chauffer",
      "pétrir",
      "démouler",
      "préchauffer",
      "couper",
      "hacher",
      "émincer",
      "trancher",
      "râper",
      "peler",
      "éplucher",
      "mijoter",
      "bouillir",
      "sauter",
      "frire",
      "griller",
      "rôtir",
      "flamber",
      "laisser",
      "réserver",
      "assaisonner",
      "saler",
      "poivrer",
    ];

    return actionVerbs.some((verb) =>
      new RegExp(`\\b${verb}\\b`, "i").test(text)
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputText.trim()) {
      const text = inputText.trim();

      if (isIngredient(text)) {
        form.setData("ingredients", [...form.data.ingredients, text]);
        setInputText("");
      } else if (isInstruction(text)) {
        form.setData("instructions", [...form.data.instructions, text]);
        setInputText("");
      } else {
        // Si pas de détection automatique, laisser l'utilisateur choisir
        if (
          window.confirm(
            "Voulez-vous ajouter ce texte comme un ingrédient? Cliquez sur Annuler pour l'ajouter comme instruction."
          )
        ) {
          form.setData("ingredients", [...form.data.ingredients, text]);
        } else {
          form.setData("instructions", [...form.data.instructions, text]);
        }
        setInputText("");
      }
    }
  };

  const addManually = (type: "ingredient" | "instruction") => {
    if (!inputText.trim()) return;

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
        form.data.ingredients.filter((_, i) => i !== index)
      );
    } else {
      form.setData(
        "instructions",
        form.data.instructions.filter((_, i) => i !== index)
      );
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">Éditeur de Recettes</h1>

      <div className="mb-6">
        <label className="block mb-2 font-semibold">
          Saisissez votre texte:
        </label>
        <div className="flex">
          <input
            ref={inputRef}
            type="text"
            className="flex-grow p-2 border rounded"
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
        <p className="text-sm text-gray-600 mt-1">
          Appuyez sur Entrée pour une détection automatique, ou utilisez les
          boutons pour ajouter manuellement.
        </p>
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
    </div>
  );
}
