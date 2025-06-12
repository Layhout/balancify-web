export type FirebaseWhereFilterOp =
  | '<'
  | '<='
  | '=='
  | '!='
  | '>='
  | '>'
  | 'array-contains'
  | 'in'
  | 'array-contains-any'
  | 'not-in'

export type User = {
  id: string
  firstName: string
  lastName: string
  imageUrl?: string
  profileBgColor?: string
  email: string
  fullName: string
  oneSignalId?: string
}
