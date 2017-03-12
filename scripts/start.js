const static = require('node-static')
const { createServer } = require('http')

const port = 8080
const file = new static.Server('./dist')

const listener = (req, res) => req
  .addListener('end', () => file.serve(req, res))
  .resume()

createServer(listener)
  .listen(port)
