import express from 'express';

export const router = express.Router();

import { createNewItem } from '../controllers/crud/postMethods.controller.js';
import {
  getAllItems,
  getItemById,
  getItemByName,
  getFavouriteItems,
  getItemLevels,
  getCategories,
} from '../controllers/crud/getMethods.controller.js';
import {
  updateCategory,
  updateItem,
} from '../controllers/crud/putMethods.controller.js';
import { deleteItem } from '../controllers/crud/deleteMethods.controller.js';

// logic/crud
router.post('/', createNewItem);
router.get('/', getItemByName);
router.get('/all', getAllItems);
router.get('/favourites', getFavouriteItems);
router.get('/levels', getItemLevels);
router.get('/category', getCategories);
router.put('/category/:id', updateCategory);

// always have :id at the end
router.get('/:id', getItemById);
router.put('/:id', updateItem);
console.log('inside items router');
router.delete('/:id', deleteItem);

//TODO:
// router.get('/category/:category', fetchSpecificCategory);
