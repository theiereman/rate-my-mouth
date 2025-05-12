export interface TagType {
  id: number
  name: string
}

export type TagFormType = Omit<TagType, 'id'>
