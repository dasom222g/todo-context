import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import useInputs from '../hooks/useInputs'
import { TodoListIDType } from '../variable/type'
import TodoUpdateNote from './TodoUpdateNote'

type TodoUpdateFormProps = {
  selectedItem: TodoListIDType,
  updateTodo: (title: string, description: string) => void
}

function TodoUpdateForm({selectedItem, updateTodo}: TodoUpdateFormProps) {
  const initailState = {
    title: selectedItem.title,
  }

  const [form, onChange, reset] = useInputs(initailState)
  const { title } = form
  const [description, setDescription] = useState(selectedItem.description)

  const history = useHistory()

  const goHome = () => {
    history.push('/')
  }

  const changeDesc = (value: string) => {
    setDescription(value)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!title || /^\s*$/.test(title)) {
      reset()
      return
    }
    if (window.confirm('Are you sure change item?')) {
      updateTodo(title.trim(), description.trim())
      goHome()
      reset()
    }
  }

  const handleCancel = () => {
    if (window.confirm('Are you sure cancel?')) goHome()
  }

  return (
    <section>
      <div className="form">
        <form action="/update" method="post" onSubmit={handleSubmit}>
          <div className="form-wrap">
            <input
              type="text"
              className="form__element"
              name="title"
              placeholder="Write a new todo"
              value={title}
              onChange={onChange}
            />
          </div>
          <TodoUpdateNote selectedItem={selectedItem} changeData={changeDesc}/>
          <div className="button-area">
            <button
              type="button"
              className="button-base button-base--cancel"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button type="submit" className="button-base">
              Confirm
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default TodoUpdateForm
