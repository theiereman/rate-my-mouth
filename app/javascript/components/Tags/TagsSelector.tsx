import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { Badge, Combo, ComboValue } from "@components/ui";
import { TagType } from "@customTypes/tag.types";

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
  createNewTags?: boolean;
}

export default function TagsSelector({
  label = "Tags",
  placeholder = "Sélectionner des tags...",
  onTagsSelected,
  className = "",
  initialTags = [],
  maxTags = 3,
  createNewTags = true,
}: TagsSelectorProps) {
  const [tags, setTags] = useState<TagType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<TagType[]>([]);
  const [searchValue, setSearchValue] = useState("");

  const filteredTags: ComboValue[] = tags
    .filter((tag) => !selectedTags.some((selected) => selected.id === tag.id))
    .filter((tag) =>
      tag.name.toLowerCase().includes(searchValue.toLowerCase().trim())
    )
    .map<ComboValue>((tag) => {
      return {
        value: tag.id,
        label: `${tag.name} (${tag.number_of_recipes})`,
      };
    });

  //loading existing tags from database
  useEffect(() => {
    const fetchTags = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("/tags");
        setTags(response.data);

        const initialTagObjects = initialTags.map((tagAttr) => {
          if (tagAttr.id) {
            const existingTag = response.data.find(
              (t: TagType) => t.id === tagAttr.id
            );
            if (existingTag) return existingTag;
          }
          return { id: tagAttr.id, name: tagAttr.name } as TagType;
        });
        setSelectedTags(initialTagObjects);
      } catch (err) {
        setError("Erreur lors du chargement des tags");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTags();
  }, []);

  const createNewTagOption = useMemo(() => {
    if (!createNewTags) return null;
    if (!searchValue.trim()) return null;

    const tagExists = tags.some(
      (tag) => tag.name.toLowerCase() === searchValue.toLowerCase()
    );

    if (!tagExists) {
      return {
        value: -1,
        label: `Créer "${searchValue}"`,
      };
    }

    return null;
  }, [searchValue, tags]);

  const allOptions =
    createNewTagOption == null
      ? filteredTags
      : [createNewTagOption, ...filteredTags];

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

      <Combo
        values={allOptions}
        onSelectedValue={handleTagSelected}
        onSearchValueChange={setSearchValue}
        placeholder={
          isLoading
            ? "Chargement des tags..."
            : selectedTags.length >= maxTags
            ? "Nombre maximum de tags atteint"
            : placeholder
        }
        label={label && `${label} (max. ${maxTags})`}
        disabled={isLoading || selectedTags.length >= maxTags}
        erasable={false}
        className="w-full"
      />

      {selectedTags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {selectedTags.map((tag) => (
            <Badge
              key={tag.id}
              variant="primary"
              icon={
                <span
                  className="material-symbols-outlined cursor-pointer material-icon--md"
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
    </div>
  );
}
