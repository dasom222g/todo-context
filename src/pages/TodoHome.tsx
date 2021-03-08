import React, { useEffect } from 'react'
import TodoForm from '../components/TodoForm'
import TodoHeader from '../components/TodoHeader'
import TodoList from '../components/TodoList'
import { getTodos, postTodo, deleteTodo, UseTodoDispatch, UseTodoState, putTodo } from '../context/TodoConext'
import { TodoListType } from '../variable/type'

function TodoHome() {
  const state = UseTodoState()
  const {isLoading, data: todoList, error} = state
  const dispatch = UseTodoDispatch()

  const addTodo = (title: string) => {
    const { allIds, byId } = todoList
    const sameArr = allIds.filter(id => byId[id].title === title)
    if (!sameArr.length) {
      const newItem:TodoListType = {
        title,
        description: '',
        isComplete: false
      }
      postTodo(dispatch, newItem)
    }
  }

  const completeTodo = (id: string) => {
    const targetItem = todoList.byId[id]
    const changeItem = {
      ...targetItem,
      isComplete: !targetItem.isComplete
    }
    putTodo(dispatch, changeItem)
  }

  const removeTodo =(id: string) => {
    deleteTodo(dispatch, id)
  }

  useEffect(() => {
    getTodos(dispatch)
  }, [dispatch])

  if (isLoading) return <div>loading..</div>
  if (error) return <div>error..</div>
  return (
    <div>
      <TodoHeader />
      <TodoForm addTodo={addTodo} />
      <TodoList todoList={todoList} completeTodo={completeTodo} removeTodo={removeTodo} />
    </div>
  )
}

export default TodoHome
