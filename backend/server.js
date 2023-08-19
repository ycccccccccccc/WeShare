const port = 3000
const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const cors = require('cors');
const WebSocket = require('ws');
const http = require('http');

app.use(bodyParser.json());
app.get('/',(req, res) => {res.send('WeShare is listening!')})

app.use(cors());
const { rateLimiter } = require('./utils/redis');
app.use(rateLimiter);

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

const server = http.createServer(app); // Create an HTTP server

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  // This function is called whenever a new WebSocket connection is established
  console.log('New WebSocket connection established');

  // Listen for messages from clients
  ws.on('message', (message) => {
    console.log(`Received message: ${message}`);
  });

  ws.send('後端收到訊息，回傳給前端');

});

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

module.exports = server;
