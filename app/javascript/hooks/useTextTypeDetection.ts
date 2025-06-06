import { ACTION_VERBS, INGREDIENT_PATTERNS } from "@const/text-detection";
import { ItemType } from "@customTypes/recipe.types";
import { useEffect, useState } from "react";

export function useTextTypeDetection() {
  const [inputText, setInputText] = useState<string>("");
  const [detectedType, setDetectedType] = useState<ItemType>(undefined);

  // Fonction pour détecter si le texte est un ingrédient
  const isIngredient = (text: string): boolean => {
    return (
      INGREDIENT_PATTERNS.numericPattern.test(text) ||
      INGREDIENT_PATTERNS.textualQuantityPattern.test(text) ||
      INGREDIENT_PATTERNS.simpleIngredientPattern.test(text)
    );
  };

  // Fonction pour détecter si le texte est une instruction
  const isInstruction = (text: string): boolean => {
    // Vérifier si le texte contient un verbe d'action culinaire
    const containsActionVerb = ACTION_VERBS.some((verb) =>
      new RegExp(`\\b${verb}\\b`, "i").test(text)
    );

    // Vérifier si le texte commence par un verbe à l'impératif ou à l'infinitif
    const startsWithVerb = ACTION_VERBS.some((verb) =>
      new RegExp(`^\\s*${verb}\\b`, "i").test(text)
    );

    // Vérifier si le texte contient des indicateurs temporels
    const containsTimeIndicator =
      /\b(pendant|durant|minutes?|heures?|secondes?|min|h|jusqu'à|jusqu'a)\b/i.test(
        text
      );

    // Vérifier si le texte est une phrase complète
    const isFullSentence = text.split(/\s+/).length > 5;

    return (
      startsWithVerb ||
      containsActionVerb ||
      containsTimeIndicator ||
      isFullSentence
    );
  };

  // Mettre à jour le type détecté quand le texte change
  useEffect(() => {
    if (!inputText.trim()) {
      setDetectedType(undefined);
      return;
    }

    const text = inputText.trim();

    if (isInstruction(text)) {
      setDetectedType("instruction");
    } else {
      setDetectedType("ingredient");
    }
  }, [inputText]);

  return {
    inputText,
    setInputText,
    detectedType,
    isIngredient,
    isInstruction,
  };
}
