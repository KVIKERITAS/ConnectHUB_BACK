import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import chatRouter from './routes/chat';
import postRouter from './routes/post';
import userRouter from './routes/user';
require('dotenv').config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

const server = http.createServer(app);
require('./modules/sockets')(server);

server.listen(8080, () => {
  console.log('Server running on http://localhost:8080/');
});

mongoose.connect(process.env.DB_TOKEN);
mongoose.connection.on('error', (error: Error) => console.log(error));

app.use('/api/users', userRouter);
app.use('/api/posts', postRouter);
app.use('/api/chat', chatRouter);
