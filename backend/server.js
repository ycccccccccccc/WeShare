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
        console.log("No token provided")
      	return { error: 'No token provided' };
      }
      try {
	  const accessToken = token.split(' ')[1];
          // 'WeShare' 之後要移去.env
          const decoded = jwt.verify(accessToken, 'WeShare');
	  console.log("Decoded:",decoded)
          next();
      } catch (error) {
          console.log("error:",error)
          return { error: 'Invalid token' };
      }
})

io.on("connection", (socket) => {
  socket.on("message", async (msg) => {

    console.log("connection success,message is",msg,msg.id,msg.message,socket.handshake.headers.authorization)
    const accessToken = socket.handshake.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(accessToken, 'WeShare');
    const big = decoded.id > msg.id ? decoded.id : msg.id
    const low = decoded.id > msg.id ? msg.id : decoded.id
    socket.join(`chat${low}${big}`)
    console.log(`chat${low}${big}`)
    try {

    	const sql = "INSERT INTO chat (sender_id, receiver_id, message) VALUES (?, ?, ?)"
    	const [results] = await db.query(sql, [decoded.id,msg.id,msg.message])
    	const data = {
    		id: results.insertId,
        	message: msg.message,
		user: {
			id:decoded.id
		}
    	}
    	io.to(`chat${low}${big}`).emit("response",data)
        console.log("Send success")
    } catch (err) {
	console.log("send err:",err)
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
