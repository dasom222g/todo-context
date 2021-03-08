import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import TodoHeader from '../components/TodoHeader'
import TodoUpdateForm from '../components/TodoUpdateForm'
import { getTodo, putTodo, UseTodoDispatch, UseTodoState } from '../context/TodoConext'
import { TodoListIDType } from '../variable/type'

function TodoUpdate() {
  const state = UseTodoState()
  const dispatch = UseTodoDispatch()

  const { isLoading, selectedItem, error } = state
  const id = useParams<{itemId: string}>().itemId

  const updateTodo= (title: string, description: string) => {
    if (selectedItem) {
      const changeItem:TodoListIDType = {
        ...selectedItem,
        title,
        description,
      }
      putTodo(dispatch, changeItem)
    }
  }

  useEffect(() => {
    getTodo(dispatch, id)
  }, [dispatch, id])

  if (isLoading) return <div>loading...</div>
  if (error) return <div>error...</div>
  return (
    <>
      <TodoHeader />
      {selectedItem && <TodoUpdateForm selectedItem={selectedItem} updateTodo={updateTodo} />}
    </>
  )
}

export default TodoUpdate
