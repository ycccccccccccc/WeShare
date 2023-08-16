const port = 3000
const express = require('express')
const app = express()
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.get('/',(req, res) => {res.send('WeShare is listening!')})

const user_route = require('./routes/userRoute');
app.use('/users',user_route);

const chat_route = require('./routes/chatRoute');
app.use('/chats',chat_route);

const item_route = require('./routes/itemRoute');
app.use('/items',item_route);

const order_route = require('./routes/orderRoute');
app.use('/orders', order_route);

const event_route = require('./routes/eventRoute');
app.use('/events', event_route);

const server = app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

module.exports = server;
