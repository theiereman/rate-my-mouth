import { Input } from "@components/ui";
import TagsCombo from "@components/Tags/TagsCombo";
import { TagType } from "@customTypes/tag.types";
import { UserType } from "@customTypes/user.types";
import UserCombo from "@components/Users/UserCombo";

interface RecipeFiltersProps {
  searchQuery: string;
  onSearchQueryChange: (value: string) => void;
  selectedUser: UserType | null;
  onSelectedUserChange: (user: UserType | null) => void;
  selectedTags: TagType[];
  onSelectedTagsChange: (tags: TagType[]) => void;
}

export default function RecipeFilters({
  searchQuery,
  onSearchQueryChange,
  selectedUser,
  onSelectedUserChange,
  selectedTags,
  onSelectedTagsChange,
}: RecipeFiltersProps) {
  return (
    <div className="grid grid-cols-1 gap-2 md:grid-cols-3 md:gap-4">
      <Input
        label="Nom de la recette"
        onChange={(e) => onSearchQueryChange(e.target.value)}
        value={searchQuery}
      />

      <UserCombo
        selectedUser={selectedUser}
        onSelectedUserChange={onSelectedUserChange}
      />

      <TagsCombo
        selectedTags={selectedTags}
        onSelectedTagsChange={onSelectedTagsChange}
      />
    </div>
  );
}
