const port = 3000
const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const path = require('path');
const jwt = require('jsonwebtoken')
const util = require('./utils/util')
const { db } = require('./utils/util');

app.use(bodyParser.json());
app.get('/',(req, res) => {res.send('WeShare is listening!')})

app.use('/static', express.static(path.join(__dirname, 'static')));

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

const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.use((socket, next) => {
      const token = socket.handshake.headers.authorization
      console.log("socket test token:",token)
      if (!token || !token.startsWith('Bearer ')) {
      	return res.status(401).json({ error: 'No token provided' });
      }
      const accessToken = token.split(' ')[1];
      try {
          // 'WeShare' 之後要移去.env
          const decoded = jwt.verify(accessToken, 'WeShare');
          req.user = decoded;
          next();
      } catch (error) {
          return res.status(403).json({ error: 'Invalid token' });
      }
})

io.on("connection", (socket) => {
  socket.on("message", async (msg) => {

    console.log("connection success,message is",msg,msg.id,msg.message,req.user,req.user.id,socket.handshake.headers.authorization)
    const big = req.user.id > msg.id ? req.user.id : msg.id
    const low = req.user.id > msg.id ? msg.id : req.user.id
    socket.join(`chat${low}${big}`)

    try {

    	const sql = "INSERT INTO chat (sender_id, receiver_id, message) VALUES (?, ?, ?)"
    	const [results] = await db.query(sql, [req.user.id,msg.id,msg.message])
    	const data = {
    		id: results.insertId,
        message: message
    	}
    	io.to(`chat${low}${big}`).emit("response",data)

    } catch (err) {
      return { 
        msg: "Socket io error",
        err: err 
      };
    }
  })
});

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

module.exports = server;
