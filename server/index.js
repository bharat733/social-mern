import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";


// routes
import AuthRoute from './routes/AuthRoute.js'
import UserRoute from './routes/UserRoute.js'
import PostRoute from './routes/PostRoute.js'
import UploadRoute from './routes/UploadRoute.js'
import ChatRoute from './routes/ChatRoute.js'
import MessageRoute from './routes/MessageRoute.js'

const app = express();

const corsOptions ={
  origin:'http://localhost:3000', 
  credentials:true,            
  //access-control-allow-credentials:true
  optionSuccessStatus:200
}

// middleware
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use(cors(corsOptions));

// to serve images inside public folder
app.use(express.static('public')); 
app.use('/images', express.static('images'));


dotenv.config();
const PORT = process.env.PORT;

const CONNECTION =process.env.MONGODB_CONNECTION;

const connect = async ()=>{
  await mongoose
  .connect(CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Listening at Port ${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));
}

connect();

app.use('/auth', AuthRoute);
app.use('/user', UserRoute)

app.use('/posts', PostRoute)
app.use('/upload', UploadRoute)
app.use('/chat', ChatRoute)
app.use('/message', MessageRoute)

if(process.env.NODE_ENV==='production')
{
    app.use(express.static('client/build'));
}