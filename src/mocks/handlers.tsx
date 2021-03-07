import { rest } from 'msw'

export const handlers = [
  rest.get('/api-todos', (req, res, ctx) => {
    console.log(res)
    return res(
      ctx.status(400),
      // ctx.json(req.body)
    )
  })
]