export interface TagType {
  id: number;
  name: string;
  number_of_recipes?: number;
}

export type TagFormType = Omit<TagType, "id">;
