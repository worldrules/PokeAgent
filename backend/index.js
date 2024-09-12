import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import route from './routes/userRoute.js'
import http from 'http';
import { WebSocketServer } from 'ws';

const PORT = process.env.PORT || 5000;
const MONGOURL = process.env.MONGO_URL;

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

const users = new Map();



app.use(bodyParser.json());
dotenv.config();

mongoose.connect(MONGOURL).then(() => {
    console.log("Database connected");
    app.listen(PORT, () => {
        console.log(`Server is runing on port ${PORT}`);
    })
}).catch((err) => {
    console.log(err);
})

app.use('/api/user', route)

//Websocket socket.io
wss.on('connection', (ws) => {
    console.log('Usuário conectado');

    ws.on('message', (message) => {
        const parsedMessage = JSON.parse(message);

        switch (parsedMessage.type) {
            case 'register':
                users.set(ws, parsedMessage.username);
                broadcastUserList();
                break;

            case 'message':
                const { to, content } = parsedMessage;
                const targetSocket = [...users.entries()].find(([socket, username]) => username === to)?.[0];

                if (targetSocket) {
                    targetSocket.send(JSON.stringify({
                        from: users.get(ws),
                        content: content,
                    }));
                }
                break;

            default:
                console.log('Tipo de mensagem desconhecido:', parsedMessage);
        }
    });

    ws.on('close', () => {
        console.log('Usuário desconectado');
        users.delete(ws);
        broadcastUserList();
    });
});