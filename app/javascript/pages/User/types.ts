export interface UserType {
  id: number
  username: string
}

export type UserFormType = Omit<UserType, 'id'>
