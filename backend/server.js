const port = 3000
const express = require('express')
const app = express()

const server = app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.get('/',(req, res) => {res.send('WeShare is listening!')})


module.exports = server;
