import { useState } from "react";

export default function RecipeParser() {
  interface recipeType {
    ingredients: {
      name: string;
      quantity: string;
      unit: string;
    }[];
    instructions: string[];
    time: {
      duration: string;
      unit: string;
    } | null;
  }

  const [rawText, setRawText] = useState("");
  const [parsedRecipe, setParsedRecipe] = useState<recipeType>({
    ingredients: [],
    instructions: [],
    time: null,
  });

  const parseRecipe = () => {
    // Structure de données pour la recette parsée
    const recipe = {
      ingredients: [],
      instructions: [],
      time: null,
    };

    const text = rawText.toLowerCase();

    // Extraction des ingrédients avec une regex améliorée
    const ingredientRegex =
      /(\d+(?:[,.]\d+)?)\s*([a-zÀ-ÿ]*)\s*(?:de|d'|du|des)?\s*([a-zÀ-ÿ\s]+?)(?=\s*(?:,|\.|\s+et|\s+puis|\s+[àa]|\s+pendant|\s+au|$))/gi;

    let match;
    while ((match = ingredientRegex.exec(text)) !== null) {
      const quantity = match[1];
      const unit = match[2] || "";
      // Nettoyage des noms d'ingrédients
      let name = match[3].trim();

      // Éviter les faux positifs pour les durées
      if (
        name.includes("heure") ||
        name.includes("minute") ||
        name.includes("seconde")
      ) {
        continue;
      }

      // Vérifier si l'ingrédient n'est pas déjà présent
      if (name && !recipe.ingredients.some((i) => i.name === name)) {
        recipe.ingredients.push({
          name,
          quantity,
          unit,
        });
      }
    }

    // Extraction du temps de cuisson/préparation
    const timeRegex =
      /pendant\s+(\d+(?:[,.]\d+)?)\s*(heure|min|minute|h|seconde|s)s?/gi;
    const timeMatch = timeRegex.exec(text);

    if (timeMatch) {
      const duration = timeMatch[1];
      const unit = timeMatch[2];
      let standardUnit = unit;

      // Normalisation des unités de temps
      if (unit === "h" || unit === "heure") standardUnit = "heures";
      if (unit === "min" || unit === "minute") standardUnit = "minutes";
      if (unit === "s" || unit === "seconde") standardUnit = "secondes";

      recipe.time = {
        duration,
        unit: standardUnit,
      };
    }

    // Extraction des instructions avec une approche plus robuste
    // Diviser le texte en phrases
    const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0);

    // Verbes d'action culinaire courants
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
      "mélanger",
      "garnir",
      "napper",
      "décorer",
      "servir",
    ];

    // Analyser chaque phrase pour voir si elle contient une instruction
    for (let sentence of sentences) {
      sentence = sentence.trim();
      if (!sentence) continue;

      // Vérifier si la phrase contient un verbe d'action
      const hasActionVerb = actionVerbs.some((verb) =>
        new RegExp(`\\b${verb}\\b`, "i").test(sentence)
      );

      if (hasActionVerb) {
        // Ajouter un point à la fin si nécessaire
        if (!sentence.endsWith(".")) {
          sentence += ".";
        }
        recipe.instructions.push(sentence);
      }
    }

    setParsedRecipe(recipe);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Parseur de Recettes</h1>

      <div className="mb-4">
        <label className="block mb-2">Texte de la recette:</label>
        <textarea
          className="w-full p-2 border rounded"
          rows="6"
          value={rawText}
          onChange={(e) => setRawText(e.target.value)}
          placeholder="Ex: Couper 200g de viande hachée en morceaux, ajouter 1 litre de sauce tomate puis laisser mijoter pendant 1 heure"
        />
      </div>

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        onClick={parseRecipe}
      >
        Parser la recette
      </button>

      {parsedRecipe && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Résultat du parsing</h2>

          <div className="bg-gray-100 p-4 rounded">
            <h3 className="font-bold">Ingrédients:</h3>
            {parsedRecipe.ingredients.length > 0 ? (
              <ul className="list-disc pl-5 mb-4">
                {parsedRecipe.ingredients.map((ingredient, idx) => (
                  <li key={idx}>
                    {ingredient.name}: {ingredient.quantity} {ingredient.unit}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mb-4 italic">Aucun ingrédient détecté</p>
            )}

            <h3 className="font-bold">Temps de cuisson/préparation:</h3>
            {parsedRecipe.time ? (
              <p className="mb-4">
                {parsedRecipe.time.duration} {parsedRecipe.time.unit}
              </p>
            ) : (
              <p className="mb-4 italic">Aucun temps détecté</p>
            )}

            <h3 className="font-bold">Instructions:</h3>
            {parsedRecipe.instructions.length > 0 ? (
              <ol className="list-decimal pl-5">
                {parsedRecipe.instructions.map((instruction, idx) => (
                  <li key={idx}>{instruction}</li>
                ))}
              </ol>
            ) : (
              <p className="italic">Aucune instruction détectée</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
