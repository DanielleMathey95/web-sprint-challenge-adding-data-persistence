// build your server here and require it from index.js
require('dotenv').config()

const server = require('./api/server')

const PORT = process.env.PORT || 5000

server.listen(PORT, () => {
  console.log(`server is running on ${PORT}`)
})