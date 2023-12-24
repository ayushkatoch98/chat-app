// const express = require('express')
import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import multer from 'multer'
const app = express()
const port = 3001
// const router = require("./routes/authRouter")
import router from './routes/authRouter.js';
import { mongoose } from 'mongoose'


import { signin, signup } from './controllers/authController.js';
import { getAllUserConversations } from './controllers/conversationController.js';
import { createMessage, createUserMessage, getAllMessages } from './controllers/messageController.js';
import { checkIfSignedIn, verfiyJtwToken } from './middleware/index.js';
import { addFriend, getAllFriends } from './controllers/userController.js';
import { Server } from 'socket.io';
import path from 'path';


const corsOptions = {
	origin: 'http://192.168.1.139:5173', // frontend url 
	credentials: true,            //access-control-allow-credentials:true
	optionSuccessStatus: 200
}
app.use("*", cors(corsOptions));

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
// app.use(compression());
app.use(cookieParser());


// Set up the 'uploads' folder for storing uploaded images
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/');
    },
    filename: (req, file, cb) => {
		console.log("Running")
		
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const fileExtension = path.extname(file.originalname);
		console.log("RES")
        cb(null, uniqueSuffix + fileExtension);
    },
});
const upload = multer({ storage: storage });


app.listen(port, '0.0.0.0', () => {
	console.log(`Example app listening on port ${port}`)
})

app.get('/', (req, res) => {
	res.send('Hello World!')
})
app.post('/signup', upload.single('image'), signup)
app.post('/signin', signin)

app.post('/conversation', checkIfSignedIn);
app.get('/conversation', checkIfSignedIn);
app.post('/message', checkIfSignedIn);
app.post('/friend', checkIfSignedIn);
app.get('/friend', checkIfSignedIn)

// app.post('/conversation', createConversation)
app.get('/conversation', getAllMessages)
app.post('/message', createUserMessage)

app.post("/friend", addFriend)
app.get("/friend", getAllFriends)



const ser = http.createServer(app);
const io = new Server(ser);



const connectedUserData = {}
// Socket.IO connection event
io.on('connection', (socket) => {
	console.log('A user connected');
	socket.join(socket.id);
	connectedUserData[socket.id] = null;
	// Listen for messages from clients
	socket.on('sendMessage', async (data) => {
		console.log('Message from client:', data);
		//   const data = JSON.parse(msg)
		let userData = null;
		try {
			userData = await verfiyJtwToken(data.jwt)
			console.log("verified");
		}
		catch (e) {
			console.log("unable to verify jwt token");
			return;
		}

		console.log("SEND MESSAGE DATA", userData, data)
		const send = await createMessage(userData._id, data.userID, userData, data.message)
		// Broadcast the message to all connected clients
		console.log("SENDING TO USER", send)
		io.to(data.conversationID).emit("receiveMessage", send);
	});

	socket.on("join", async (data) => {

		const convoID = data.conversationID;
		connectedUserData[socket.id] = data.conversationID;
		socket.join(convoID);

	})

	socket.on("leave", async (data) => {
		if (connectedUserData[socket.io] == null) return;
		socket.leave(connectedUserData[socket.io]);
		connectedUserData[socket.io] = null;
	})

	// Listen for disconnection
	socket.on('disconnect', () => {
		console.log('User disconnected');
	});
});

ser.listen(3002, '0.0.0.0', () => {
	console.log(`Server running on http://localhost:${3001}`);
});


const MONGO_URL = "mongodb+srv://ayush98katoch:JgKlaUe3rli6xQ9g@cluster0.rff1mcv.mongodb.net/?retryWrites=true&w=majority";

mongoose.promise = Promise;


try {
	mongoose.connect(MONGO_URL);
} catch (err) {
	console.log("mongodb error")
}

mongoose.connection.on('error', (error) => console.log("MONGODB ERROR"));

