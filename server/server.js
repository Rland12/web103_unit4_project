import express from 'express';
import cors from 'cors';
import itemsRouter from './routes/itemsRoutes.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => res.json({ ok: true }));
app.use('/api', itemsRouter);

app.listen(PORT, () => {
  console.log(`🚀 API listening on http://localhost:${PORT}`);
});
