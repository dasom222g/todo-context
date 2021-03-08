import React from 'react'
import useInputs from '../hooks/useInputs'
import { TodoListType } from '../variable/type'

type TodoUpdateNoteProps = {
  selectedItem: TodoListType,
  changeData: (description: string) => void
}

function TodoUpdateNote({selectedItem, changeData}: TodoUpdateNoteProps) {
  const initialState = {
    description: selectedItem.description
  }
  const [form, onChange] = useInputs(initialState)
  const { description } = form

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e)
    changeData(e.target.value)
  }
  return (
    <div className="todo__detail-desc">
      <textarea
        name="description"
        placeholder="Write a note.."
        value={description}
        onChange={handleChange}
      />
    </div>
  )
}

export default TodoUpdateNote
