import React, { createContext, Dispatch, useContext, useReducer } from 'react'
import { AsyncType, NormalDataType, TodoListIDType, ByIdType, TodoListType } from '../variable/type'
import { header, sleep } from '../variable/variable'
import produce from 'immer'

// useReducer로 state관리

type ActionType =
  | {type: 'FETCH_TODOS_SUCCESS', payload: TodoListIDType[]}
  | {type: 'FETCH_TODOS_ERROR', error: object}
  | {type: 'FETCH_TODO'}
  | {type: 'FETCH_TODO_SUCCESS', payload: TodoListIDType}
  | {type: 'FETCH_TODO_ERROR', error: object}
  | {type: 'ADD_TODO', payload: TodoListIDType}
  | {type: 'ADD_TODO_ERROR', error: object}
  | {type: 'UPDATE_TODO', payload: TodoListIDType}
  | {type: 'UPDATE_TODO_ERROR', error: object}
  | {type: 'REMOVE_TODO', id: string}
  | {type: 'REMOVE_TODO_ERROR', error: object}

const initialData: NormalDataType = {
  byId: {},
  allIds: []
}

const initialState = {
  isLoading: false,
  data: initialData,
  selectedItem: null,
  error: null
}

const getList = (data: TodoListIDType[]): NormalDataType => {
  const allIds = data.map(item => item.id.toString())
  let byId: ByIdType = {}
  data.forEach(item => {
    const id = item.id.toString()
    byId[id] = item
  })
  const todoList: NormalDataType = {
    byId,
    allIds
  }
  return todoList
}

const addData = (data: NormalDataType, newItem: TodoListIDType) => {
  const id = newItem.id.toString()
  const allIds = [...data.allIds, id]
  return produce(data, draft => {
    draft.byId[id] = newItem
    draft.allIds = allIds
  })
}

const updateData = (data: NormalDataType, item: TodoListIDType) => {
  const id = item.id.toString()
  const { byId } = data
  const resultById =  produce(byId, draft => {
    draft[id] = item
  })
  const result: NormalDataType = {
    ...data,
    byId: resultById
  }
  return result
}

const removeData = (data: NormalDataType, targetId: string) => {
  const allIds = data.allIds.filter(id => id !== targetId)
  return produce(data, draft => {
    delete draft.byId[targetId]
    draft.allIds = allIds
  })
}

const reducer = (state: AsyncType, action: ActionType):AsyncType => {
  switch(action.type) {
    case 'FETCH_TODOS_SUCCESS':
      return produce(state, draft => {
        draft.isLoading = false
        draft.data = action.payload ? getList(action.payload) : initialData
        draft.selectedItem = null
        draft.error = null
      })
    case 'FETCH_TODOS_ERROR':
      return produce(state, draft => {
        draft.isLoading = false
        draft.data = initialData
        draft.selectedItem = null
        draft.error = action.error
      })
    case 'FETCH_TODO':
      return produce(state, draft => {
        draft.isLoading = true
        // draft.data = initialData
        draft.selectedItem = null
        draft.error = null
      })
    case 'FETCH_TODO_SUCCESS':
      return produce(state, draft => {
        draft.isLoading = false
        // draft.data = initialData
        draft.selectedItem = action.payload
        draft.error = null
      })
    case 'FETCH_TODO_ERROR':
      return produce(state, draft => {
        draft.isLoading = false
        // draft.data = initialData
        draft.selectedItem = null
        draft.error = action.error
      })
    case 'ADD_TODO':
      return produce(state, draft => {
        draft.isLoading = false
        draft.data = addData(state.data, action.payload)
        draft.selectedItem = null
        draft.error = null
      })
    case 'ADD_TODO_ERROR':
      return produce(state, draft => {
        draft.isLoading = false
        draft.data = initialData
        draft.selectedItem = null
        draft.error = action.error
      })
    case 'UPDATE_TODO':
      return produce(state, draft => {
        draft.isLoading = false
        draft.data = updateData(state.data, action.payload)
        draft.selectedItem = null
        draft.error = null
      })
    case 'UPDATE_TODO_ERROR':
      return produce(state, draft => {
        draft.isLoading = false
        draft.data = initialData
        draft.selectedItem = null
        draft.error = action.error
      })
    case 'REMOVE_TODO':
      return produce(state, draft => {
        draft.isLoading = false
        draft.data = removeData(state.data, action.id)
        draft.selectedItem = null
        draft.error = null
      })
    case 'REMOVE_TODO_ERROR':
      return produce(state, draft => {
        draft.isLoading = false
        draft.data = initialData
        draft.selectedItem = null
        draft.error = action.error
      })
    default:
      return state
  }
}

// context 생성 및 내보내기

const TodoContextState = createContext<AsyncType | null>(null)
const TodoContextDispatch = createContext<Dispatch<ActionType> | null>(null)

type TodoProviderProps = {
  children: React.ReactNode
}

export const TodoProvider = ({children}: TodoProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return <TodoContextState.Provider value={state}>
    <TodoContextDispatch.Provider value={dispatch}>
      {children}
    </TodoContextDispatch.Provider>
  </TodoContextState.Provider>
}

export const UseTodoState = () => {
  const state = useContext(TodoContextState)
  if (!state) throw new Error('Can not find TodoContextState')
  return state
}

export const UseTodoDispatch = () => {
  const dispatch = useContext(TodoContextDispatch)
  if (!dispatch) throw new Error('Can not find TodoContextDispatch')
  return dispatch
}

// api 호출

export const getTodos = async (dispatch: Dispatch<ActionType>) => {
  try {
    const response = await fetch('/api/todos', header)
    const result = await response.json()
    dispatch({type: 'FETCH_TODOS_SUCCESS', payload: result})
  } catch(e) {
    dispatch({type: 'FETCH_TODOS_ERROR', error: e})
  }
}

export const getTodo = async (dispatch: Dispatch<ActionType>, id: string) => {
  dispatch({type: 'FETCH_TODO'})
  await sleep(500)
  try {
    const response = await fetch(`/api/todos/${id}`, header)
    const result = await response.json()
    dispatch({type: 'FETCH_TODO_SUCCESS', payload: result})
  }
  catch(e) {
    dispatch({type: 'FETCH_TODO_ERROR', error: e})
  }
}

export const postTodo = async (dispatch: Dispatch<ActionType>, newItem: TodoListType) => {
  try {
    const response = await fetch('/api/todos', {
      method: 'POST',
      body: JSON.stringify(newItem)
    })
    const result = await response.json()
    dispatch({type: 'ADD_TODO', payload: result})
  } catch(e) {
    dispatch({type: 'ADD_TODO_ERROR', error: e})
  }
}

export const putTodo = async (dispatch: Dispatch<ActionType>, item: TodoListIDType) => {
  const { id } = item
  try {
    const response = await fetch(`/api/todos/${id}`, {
      method: 'PUT',
      body: JSON.stringify(item)
    })
    const result = await response.json()
    dispatch({type: 'UPDATE_TODO', payload: result})
  } catch(e) {
    dispatch({type: 'UPDATE_TODO_ERROR', error: e})
  }
}

export const deleteTodo = async (dispatch: Dispatch<ActionType>, id: string) => {
  try {
    await fetch(`/api/todos/${id}`, {
      method: 'DELETE',
    })
    dispatch({type: 'REMOVE_TODO', id})
  } catch(e) {
    dispatch({type: 'REMOVE_TODO_ERROR', error: e})
  }
}