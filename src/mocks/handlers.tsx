import { rest } from 'msw'
import { TodoListIDType } from '../variable/type'

const KEY = 'TODO_LIST'
export const handlers = [
  rest.get('/api/todos', (req, res, ctx) => {
    const store = window.localStorage.getItem(KEY)
    return res(
      ctx.status(200),
      ctx.json(store ? JSON.parse(store) : null)
    )
  }),

  rest.get('/api/todos/:itemId', (req, res, ctx) => {
    const store = window.localStorage.getItem(KEY)
    const id = req.params.itemId
    const item = store && JSON.parse(store).filter((item: { id: number }) => item.id === Number(id))
    if (req.params.itemId) {
      return res(
        ctx.status(200),
        ctx.json(item[0])
      )
    }
    return res(
      ctx.status(404)
    )
  }),

  rest.post('/api/todos', (req, res, ctx) => {
    const store = window.localStorage.getItem(KEY)
    const data = typeof req.body === 'string' && JSON.parse(req.body)
    const newItem = {
      id: Math.floor(Math.random()*99999),
      ...data
    }
    if (store !== null) {
      const result = [...JSON.parse(store), newItem]
      window.localStorage.setItem(KEY, JSON.stringify(result))
    } else {
      window.localStorage.setItem(KEY, JSON.stringify([newItem]))
    }
    return res(
      ctx.status(200),
      ctx.json(newItem)
    )
  }),

  rest.put('/api/todos/:itemId', (req, res, ctx) => {
    const store = window.localStorage.getItem(KEY)
    const id = Number(req.params.itemId)
    const data = typeof req.body === 'string' && JSON.parse(req.body)
    const { title, description, isComplete } = data
    const result = store && JSON.parse(store).map((item: TodoListIDType) => {
      if (item.id === id) {
        return {
          ...item,
          title,
          description,
          isComplete
        }
      }
      return {
        ...item
      }
    })
    window.localStorage.setItem(KEY, JSON.stringify(result))
    return res(
      ctx.status(200),
      ctx.json(data)
    )
  }),

  rest.delete('/api/todos/:itemId', (req, res, ctx) => {
    const id = req.params.itemId
    const store = window.localStorage.getItem(KEY)
    const filterArr = typeof store === 'string' && JSON.parse(store).filter((item: {id: number}) => item.id !== Number(id))
    window.localStorage.setItem(KEY, JSON.stringify(filterArr))
    return res(
      ctx.status(200)
    )
  })
]