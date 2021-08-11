const express = require('express')
const app = express()
const cors = require('cors')
require('express-async-errors')
const blogRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/user')
const middleware = require('./utils/middleware')
const morgan = require('morgan')


app.use(cors())
app.use(express.json())
app.use(morgan('tiny'))

app.get('/', (request, response) => {
    response.send('<h1>Hello!</h1>')
  })

app.use('/api/blogs', blogRouter)
app.use('/api/users', usersRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)



module.exports = app