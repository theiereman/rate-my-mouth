export interface TagType {
  id: number;
  name: string;
  recipes_count?: number;
}

export type TagFormType = Omit<TagType, "id">;
