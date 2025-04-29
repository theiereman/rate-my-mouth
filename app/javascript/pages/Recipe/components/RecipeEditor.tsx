import { InertiaFormProps } from "@inertiajs/react";
import { useState, useRef, useEffect } from "react";
import { RecipeFormType } from "../types";
import { Card, Input, Button, Badge } from "../../../components/ui";

// Type pour les éléments de la recette
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
      <Card variant="outlined">
        <Card.Header>
          <h2 className="text-xl font-semibold text-neutral-800">
            Ingrédients et instructions
          </h2>
        </Card.Header>
        <Card.Body className="space-y-4">
          <div className="flex flex-col">
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="flex-grow">
                <Input
                  ref={inputRef}
                  type="text"
                  fullWidth
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
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-5 h-5"
                    >
                      <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                    </svg>
                  }
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
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-5 h-5"
                    >
                      <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                    </svg>
                  }
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>
                  Les <strong>ingrédients</strong> contiennent généralement des
                  quantités (ex: "2 oeufs", "200g de farine", "une pincée de
                  sel")
                </span>
              </li>
              <li className="flex items-start gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5 text-secondary-500 flex-shrink-0 mt-0.5"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                    clipRule="evenodd"
                  />
                </svg>
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
          <Card variant="outlined">
            <Card.Header>
              <h2 className="text-xl font-semibold text-neutral-800 flex gap-2">
                Ingrédients
                <Badge variant="primary">
                  {form.data.ingredients?.length || 0}
                </Badge>
              </h2>
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
                <ul className="space-y-2">
                  {(form.data.ingredients || []).map((item, index) => (
                    <li
                      key={item}
                      className="flex items-center justify-between p-2 rounded-lg border border-primary-100 bg-primary-50 hover:bg-primary-100 transition-colors"
                    >
                      <span className="text-neutral-800">{item}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteItem(index, "ingredient")}
                        className="text-red-600 hover:text-red-700"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            fillRule="evenodd"
                            d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </Button>
                    </li>
                  ))}
                </ul>
              )}
            </Card.Body>
          </Card>
          <Card variant="outlined">
            <Card.Header>
              <h2 className="text-xl font-semibold text-neutral-800 flex gap-2">
                Instructions
                <Badge variant="secondary">
                  {form.data.instructions?.length || 0}
                </Badge>
              </h2>
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
                <ol className="space-y-2 list-none pl-0">
                  {(form.data.instructions || []).map((item, index) => (
                    <li key={item} className="flex gap-3 group">
                      <div className="flex-1 flex items-center justify-between p-2 rounded-lg border border-secondary-100 bg-secondary-50 hover:bg-secondary-100 transition-colors">
                        <p className="text-neutral-700">
                          {index + 1} - {item}
                        </p>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteItem(index, "instruction")}
                          className="text-red-600 hover:text-red-700"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="w-5 h-5"
                          >
                            <path
                              fillRule="evenodd"
                              d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </Button>
                      </div>
                    </li>
                  ))}
                </ol>
              )}
            </Card.Body>
          </Card>
        </div>
      </Card>
    </>
  );
}
