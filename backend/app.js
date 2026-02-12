import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import formRoutes from './routes/FormRoutes.js';
import conversationRoutes from './routes/ConversationRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Serve static files from frontend/public
const publicDir = path.join(__dirname, '..', 'frontend', 'public');
app.use(express.static(publicDir));

const PORT = process.env.PORT || 3000;

// Routes
app.use('/api', formRoutes);
app.use('/api', conversationRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
