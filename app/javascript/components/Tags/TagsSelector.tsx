import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { Badge, Combo, ComboValue } from "@components/ui";
import { TagType } from "@customTypes/tag.types";

interface TagAttribute {
  id?: number;
  name: string;
}

//TODO: could probably be cleaned up, but this works for now and I don't care that much tbh
interface TagsSelectorProps {
  onTagsSelected: (tags: TagAttribute[]) => void;
  label?: string;
  placeholder?: string;
  className?: string;
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

  const comboOptions: ComboValue[] = useMemo(() => {
    const availableTags = tags
      .filter((tag) => !selectedTags.some((selected) => selected.id === tag.id))
      .filter((tag) =>
        tag.name.toLowerCase().includes(searchValue.toLowerCase())
      )
      .map<ComboValue>((tag) => ({
        value: tag.id,
        label: `${tag.name} (${tag.recipes_count})`,
      }));

    if (createNewTags && searchValue.trim()) {
      const tagExists = tags.some(
        (tag) => tag.name.toLowerCase() === searchValue.toLowerCase().trim()
      );

      if (!tagExists) {
        const createOption: ComboValue = {
          value: -1,
          label: `Créer "${searchValue.trim()}"`,
        };
        return [createOption, ...availableTags];
      }
    }

    return availableTags;
  }, [searchValue, selectedTags]);

  //loading existing tags from database
  useEffect(() => {
    const fetchTags = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("/tags");
        setTags(response.data);
      } catch (err) {
        setError("Erreur lors du chargement des tags");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTags();
  }, []);

  //setting tags that were passed as props
  useEffect(() => {
    const initialTagObjects = initialTags.map((tagAttr) => {
      if (tagAttr.id) {
        const existingTag = tags.find((t: TagType) => t.id === tagAttr.id);
        if (existingTag) return existingTag;
      }
      return { id: tagAttr.id, name: tagAttr.name } as TagType;
    });
    setSelectedTags(initialTagObjects);
  }, [tags]);

  const handleTagSelected = (selectedValue: ComboValue | null) => {
    if (!selectedValue) return;

    if (selectedTags.length >= maxTags) {
      return;
    }

    if (selectedValue.value === -1) {
      const tagName = searchValue.trim();

      const tagExists = tags.some(
        (tag) => tag.name.toLowerCase() === tagName.toLowerCase()
      );

      if (tagExists) return;

      const tempTag: TagType = {
        id: -Date.now(), //negative id because new tag
        name: tagName,
      };

      const updatedSelectedTags = [...selectedTags, tempTag];
      setSelectedTags(updatedSelectedTags);

      const tagAttributes = updatedSelectedTags.map((tag) => ({
        id: tag.id > 0 ? tag.id : undefined,
        name: tag.name,
      }));
      onTagsSelected(tagAttributes);
    } else {
      const selectedTag = tags.find((tag) => tag.id === selectedValue.value);
      if (selectedTag) {
        const updatedSelectedTags = [...selectedTags, selectedTag];
        setSelectedTags(updatedSelectedTags);

        const tagAttributes = updatedSelectedTags.map((tag) => ({
          id: tag.id > 0 ? tag.id : undefined,
          name: tag.name,
        }));
        onTagsSelected(tagAttributes);
      }
    }

    setSearchValue("");
  };

  const removeTag = (tagId: number) => {
    const updatedSelectedTags = selectedTags.filter((tag) => tag.id !== tagId);
    setSelectedTags(updatedSelectedTags);

    const tagAttributes = updatedSelectedTags.map((tag) => ({
      id: tag.id > 0 ? tag.id : undefined,
      name: tag.name,
    }));
    onTagsSelected(tagAttributes);
  };

  return (
    <div className={className}>
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

      <Combo
        values={comboOptions}
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
        disableFiltering
      />

      {selectedTags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {selectedTags.map((tag) => (
            <Badge
              text={tag.name}
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
            />
          ))}
        </div>
      )}
    </div>
  );
}
