import React from 'react'
import useInputs from '../hooks/useInputs'

type TodoFormProps = {
  addTodo: (title: string) => void
}

function TodoForm({ addTodo }: TodoFormProps) {
  const initialState = {
    title: ''
  }
  const [form, onChange, reset] = useInputs(initialState)
  const { title } = form
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>):void => {
    e.preventDefault()
    if (!title || /^\s*$/.test(title)) {
      reset()
      return
    }
    addTodo(title.trim())
    reset()
  }
  return (
    <section>
      <div className="form">
        <form action="/create" method="post" onSubmit={handleSubmit}>
          <div className="form-wrap">
            <input
              type="text"
              className="form__element"
              name="title"
              placeholder="Write a new todo"
              value={title}
              onChange={onChange}
            />
            <button className="form__button" type="submit">Add</button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default TodoForm
