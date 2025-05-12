import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import Combo, { ComboValue } from "../../../components/Combo";
import { Badge } from "../../../components";
import { TagType } from "../types";

interface TagAttribute {
  id?: number;
  name: string;
}

interface TagsSelectorProps {
  onTagsSelected: (tags: TagAttribute[]) => void;
  label?: string;
  placeholder?: string;
  className?: string;
  initialTagIds?: number[];
  initialTags?: TagAttribute[];
  maxTags?: number;
}

export default function TagsSelector({
  onTagsSelected,
  label = "Tags",
  placeholder = "Rechercher ou créer un tag...",
  className = "",
  initialTagIds = [],
  initialTags = [],
  maxTags = 3,
}: TagsSelectorProps) {
  const [tags, setTags] = useState<TagType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<TagType[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [filteredTags, setFilteredTags] = useState<TagType[]>([]);

  // Charger la liste des tags
  useEffect(() => {
    const fetchTags = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("/tags");
        setTags(response.data);
        setFilteredTags(response.data);

        // Si des tags initiaux sont fournis, les utiliser
        if (initialTags.length > 0) {
          // Convertir les initialTags en objets TagType complets
          const initialTagObjects = initialTags.map((tagAttr) => {
            // Si le tag a un ID, essayer de trouver le tag complet dans la liste
            if (tagAttr.id) {
              const existingTag = response.data.find(
                (t: TagType) => t.id === tagAttr.id
              );
              if (existingTag) return existingTag;
            }
            // Sinon, créer un objet TagType à partir du nom
            return { id: tagAttr.id, name: tagAttr.name } as TagType;
          });
          setSelectedTags(initialTagObjects);
        }
        // Sinon, si des IDs initiaux sont fournis, trouver les tags correspondants
        else if (initialTagIds.length > 0) {
          const initialTagsById = response.data.filter((tag: TagType) =>
            initialTagIds.includes(tag.id)
          );
          setSelectedTags(initialTagsById);
        }
      } catch (err) {
        setError("Erreur lors du chargement des tags");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTags();
  }, []);

  // Formater les tags pour l'affichage dans la combo
  const tagOptions: ComboValue[] = filteredTags
    .filter((tag) => !selectedTags.some((selected) => selected.id === tag.id))
    .map<ComboValue>((tag) => {
      return {
        value: tag.id,
        label: `${tag.name} (${tag.number_of_recipes} recettes)`,
      };
    });

  // Option pour créer un nouveau tag si la recherche ne correspond à aucun tag existant
  const createNewTagOption = useMemo(() => {
    console.log(searchValue);
    if (!searchValue.trim()) return null;

    // Vérifier si le tag existe déjà
    const tagExists = tags.some(
      (tag) => tag.name.toLowerCase() === searchValue.toLowerCase()
    );

    // Si le tag n'existe pas, ajouter l'option pour le créer
    if (!tagExists) {
      return {
        value: -1, // Valeur temporaire pour indiquer un nouveau tag
        label: `Créer "${searchValue}"`,
      };
    }

    return null;
  }, [searchValue, tags]);

  // Combiner les options existantes avec l'option de création
  const allOptions =
    createNewTagOption == null
      ? tagOptions
      : [...tagOptions, createNewTagOption];

  // Gérer la sélection d'un tag
  const handleTagSelected = (selectedValue: ComboValue | null) => {
    if (!selectedValue) return;

    // Vérifier si on a atteint le nombre maximum de tags
    if (selectedTags.length >= maxTags) {
      return;
    }

    // Si c'est un nouveau tag à créer
    if (selectedValue.value === -1) {
      // Créer un tag temporaire avec un ID négatif pour l'identifier comme nouveau
      const tempTag: TagType = {
        id: -Date.now(), // ID négatif temporaire unique
        name: searchValue,
      };

      // Ajouter le tag temporaire aux tags sélectionnés
      const updatedSelectedTags = [...selectedTags, tempTag];
      setSelectedTags(updatedSelectedTags);

      // Convertir les tags en format TagAttribute pour le formulaire
      // Pour les nouveaux tags, on n'envoie pas d'ID pour que Rails crée un nouveau tag
      const tagAttributes = updatedSelectedTags.map((tag) => ({
        id: tag.id > 0 ? tag.id : undefined, // Omettre l'ID pour les nouveaux tags
        name: tag.name,
      }));
      onTagsSelected(tagAttributes);
    } else {
      // C'est un tag existant
      const selectedTag = tags.find((tag) => tag.id === selectedValue.value);
      if (selectedTag) {
        const updatedSelectedTags = [...selectedTags, selectedTag];
        setSelectedTags(updatedSelectedTags);

        // Convertir les tags en format TagAttribute pour le formulaire
        const tagAttributes = updatedSelectedTags.map((tag) => ({
          id: tag.id > 0 ? tag.id : undefined, // Omettre l'ID pour les nouveaux tags
          name: tag.name,
        }));
        onTagsSelected(tagAttributes);
      }
    }

    // Réinitialiser la recherche
    setSearchValue("");
    setFilteredTags(tags);
  };

  // Supprimer un tag sélectionné
  const removeTag = (tagId: number) => {
    const updatedSelectedTags = selectedTags.filter((tag) => tag.id !== tagId);
    setSelectedTags(updatedSelectedTags);

    // Convertir les tags en format TagAttribute pour le formulaire
    const tagAttributes = updatedSelectedTags.map((tag) => ({
      id: tag.id > 0 ? tag.id : undefined, // Omettre l'ID pour les nouveaux tags
      name: tag.name,
    }));
    onTagsSelected(tagAttributes);
  };

  return (
    <div className={className}>
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

      {/* Afficher les tags sélectionnés */}
      {selectedTags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-2">
          {selectedTags.map((tag) => (
            <Badge
              key={tag.id}
              variant="primary"
              className="px-2 py-1"
              icon={
                <span
                  className="material-symbols-outlined cursor-pointer text-sm"
                  onClick={() => removeTag(tag.id)}
                >
                  close
                </span>
              }
              iconPosition="right"
            >
              {tag.name}
            </Badge>
          ))}
        </div>
      )}

      {/* Afficher le message sur le nombre maximum de tags */}
      {selectedTags.length >= maxTags ? (
        <p className="text-neutral-500 text-sm mb-2">
          Nombre maximum de tags atteint ({maxTags})
        </p>
      ) : (
        <Combo
          className="flex-1"
          values={allOptions}
          onSelectedValue={handleTagSelected}
          onSearchValueChange={setSearchValue}
          placeholder={isLoading ? "Chargement des tags..." : placeholder}
          label={label}
          value={null}
          disabled={isLoading || selectedTags.length >= maxTags}
          erasable={false}
        />
      )}
    </div>
  );
}
