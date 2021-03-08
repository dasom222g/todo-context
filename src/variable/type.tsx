export type TodoListIDType = {
  id: number,
  title: string,
  description: string,
  isComplete: boolean
}
export type TodoListType = {
  title: string,
  description: string,
  isComplete: boolean
}

export type ByIdType = {
  [key: string] : TodoListIDType
}

export type NormalDataType = {
  byId: ByIdType
  allIds: string[]
}

export type AsyncType = {
  isLoading: boolean,
  data: NormalDataType,
  selectedItem: TodoListIDType | null
  error: object | null
}
