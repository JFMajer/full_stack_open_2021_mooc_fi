const app = require('./app') // the actual Express application
const http = require('http')
require('dotenv').config()


const server = http.createServer(app)

const PORT = process.env.PORT
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})


