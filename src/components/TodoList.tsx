import React from 'react'
import { NormalDataType } from '../variable/type'
import { GoCheck } from 'react-icons/go'
import { RiCloseCircleLine } from 'react-icons/ri'
import { TiEdit } from 'react-icons/ti'
import { Link } from 'react-router-dom'

type TodoListProps = {
  todoList: NormalDataType,
  completeTodo: (id: string) => void,
  removeTodo: (id: string) => void
}
function TodoList({todoList, completeTodo, removeTodo}: TodoListProps) {
  const {allIds, byId} = todoList
  return (
    <section>
      <ul className="todo__list">
        {allIds.map(id =>
          <li className="todo__item" key={id}>
            <div className={byId[id].isComplete ? 'todo__content complete' : 'todo__content'}>
              <div className="todo__item-check">
                <label>
                  <input
                    type="checkbox"
                    onChange={() => completeTodo(id)}
                  />
                  <i className="todo__item-check-icon" />
                  <GoCheck className="todo__item-check-icon complete" />
                  <span className="todo__content-text">{byId[id].title}</span>
                </label>
              </div>
              <div className="todo__item-buttonarea">
                <Link
                  to={`/update/${id}`}
                  className="todo__item-button"
                >
                  <TiEdit className="todo__item-button-icon update" />
                </Link>
                <button
                  type="button"
                  className="todo__item-button"
                  onClick={() => removeTodo(id)}
                >
                  <RiCloseCircleLine className="todo__item-button-icon delete" />
                </button>
              </div>
            </div>
          </li>
        )}
      </ul>
    </section>
  )
}

export default TodoList
