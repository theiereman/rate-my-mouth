import { Input, Combo, ComboValue } from "@components/ui";
import { TagType } from "@customTypes/tag.types";
import { UserType } from "@customTypes/user.types";

interface RecipeFiltersProps {
  searchQuery: string;
  onSearchQueryChange: (value: string) => void;
  selectedUser: UserType | null;
  onSelectedUserChange: (user: UserType | null) => void;
  selectedTags: TagType[];
  onSelectedTagsChange: (tags: TagType[]) => void;
  users: UserType[];
  tags: TagType[];
  isLoadingUsers: boolean;
  isLoadingTags: boolean;
  onSearchUsers: (value: string) => void;
  onSearchTags: (value: string) => void;
  errors?: { users?: string; tags?: string };
}

export default function RecipeFilters({
  searchQuery,
  onSearchQueryChange,
  selectedUser,
  onSelectedUserChange,
  selectedTags,
  onSelectedTagsChange,
  users,
  tags,
  isLoadingUsers,
  isLoadingTags,
  onSearchUsers,
  onSearchTags,
  errors,
}: RecipeFiltersProps) {
  const nonSelectedTags = tags.filter(
    (tag) => !selectedTags.some((t) => t.id === tag.id),
  );

  return (
    <div className="grid grid-cols-1 gap-2 md:grid-cols-3 md:gap-4">
      <Input
        label="Nom de la recette"
        onChange={(e) => onSearchQueryChange(e.target.value)}
        value={searchQuery}
      />

      <div className="space-y-1">
        <Combo
          label="Auteur de la recette"
          rightIcon={
            isLoadingUsers ? (
              <span className="material-symbols-outlined animate-spin">
                progress_activity
              </span>
            ) : undefined
          }
          values={users.map((user) => ({
            value: user.id,
            label: user.username,
          }))}
          selectedValue={
            selectedUser
              ? { value: selectedUser.id, label: selectedUser.username }
              : undefined
          }
          onSearchValueChange={(value: string) => {
            onSearchUsers(value);
          }}
          onSelectedValue={(value: ComboValue | null) => {
            onSelectedUserChange(
              users.find((user) => user.id === value?.value) || null,
            );
          }}
        />
        {errors?.users && (
          <p className="text-sm text-red-600">{errors.users}</p>
        )}
      </div>

      <div className="space-y-1">
        <Combo
          label="Tags associés"
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
            label: `${tag.name} (${tag.recipes_count})`,
          }))}
          onSearchValueChange={(value: string) => {
            onSearchTags(value);
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
        {errors?.tags && <p className="text-sm text-red-600">{errors.tags}</p>}
      </div>
    </div>
  );
}
