import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
//import connectDB from './config/db.js';
import musicRoutes from './routes/musicRoutes.js';
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));
//connectDB();
app.get('/', (req, res) => res.send('Emotion-Music Backend'));
app.use('/api/music', musicRoutes);
const PORT = process.env.PORT || 5000;
console.log("Client ID:", process.env.SPOTIFY_CLIENT_ID);
console.log("Client Secret:", process.env.SPOTIFY_CLIENT_SECRET);

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));