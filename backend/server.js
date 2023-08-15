const port = 3000
const express = require('express')
const app = express()
const bodyParser = require('body-parser');

const server = app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.use(bodyParser.json());

app.get('/',(req, res) => {res.send('WeShare is listening!')})

const user_route = require('./routes/userRoute');
const item_route = require('./routes/itemRoute');

app.use('/users',user_route);
app.use('/items', item_route)

module.exports = server;
