import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import fs from 'fs';
import path from 'path';

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

app.use(cors());

io.on('connection', (socket) => {
  console.log('Un joueur connecté :', socket.id);

  socket.on('disconnect', () => {
    console.log('Déconnecté :', socket.id);
  });
});

app.get('/api/questions', (req, res) => {
  const data = fs.readFileSync(path.resolve('data/questions.json'));
  res.json(JSON.parse(data));
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
