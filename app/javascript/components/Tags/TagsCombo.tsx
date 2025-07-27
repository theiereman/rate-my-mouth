import { Combo, ComboValue } from "@components/ui";
import { TagType } from "@customTypes/tag.types";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDebouncedCallback } from "use-debounce";

interface TagsComboProps {
  label?: string;
  selectedTags: TagType[];
  onSelectedTagsChange: (tags: TagType[]) => void;
  className?: string;
}

export default function TagsCombo({
  label = "Tags associés",
  selectedTags,
  onSelectedTagsChange,
  className,
}: TagsComboProps) {
  const [tags, setTags] = useState<TagType[]>([]);
  const [isLoadingTags, setIsLoadingTags] = useState(false);
  const [error, setError] = useState<string>();

  const searchTags = async (value: string) => {
    try {
      setIsLoadingTags(true);
      setError(undefined);
      const response = await axios.get(`/tags${value ? `?name=${value}` : ""}`);
      setTags(response.data.tags);
    } catch (error) {
      setError("Erreur lors du chargement des tags");
    } finally {
      setIsLoadingTags(false);
    }
  };

  const debouncedSearchTags = useDebouncedCallback(searchTags, 500);

  const initTags = () => searchTags("");

  // Charger les tags au montage du composant
  useEffect(() => {
    initTags();
  }, []);

  const nonSelectedTags = tags.filter(
    (tag) => !selectedTags.some((t) => t.id === tag.id),
  );

  return (
    <div className={`space-y-1 ${className || ""}`}>
      <Combo
        label={label}
        rightIcon={
          isLoadingTags ? (
            <span className="material-symbols-outlined animate-spin">
              progress_activity
            </span>
          ) : undefined
        }
        selectedValue={selectedTags?.map((tag) => ({
          value: tag.id,
          label: tag.name,
        }))}
        values={nonSelectedTags.map((tag) => ({
          value: tag.id,
          label: `${tag.name} (${tag.recipes_count || 0})`,
        }))}
        onSearchValueChange={(value: string) => {
          debouncedSearchTags(value);
        }}
        onSelectedValue={(value: ComboValue | null) => {
          const tag = tags.find((tag) => tag.id === value?.value);
          if (tag) {
            onSelectedTagsChange([...selectedTags, tag]);
          }
        }}
        onSelectedValueRemove={(value: ComboValue) => {
          onSelectedTagsChange(
            selectedTags.filter((tag) => tag.id !== value.value),
          );
        }}
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
