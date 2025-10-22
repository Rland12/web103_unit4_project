import express from 'express';
import {
  getAllItems, getItem, createItem, updateItem, deleteItem
} from '../controllers/itemsController.js';

const router = express.Router();

router.get('/items', getAllItems);
router.get('/items/:id', getItem);
router.post('/items', createItem);
router.put('/items/:id', updateItem);
router.delete('/items/:id', deleteItem);

export default router;
