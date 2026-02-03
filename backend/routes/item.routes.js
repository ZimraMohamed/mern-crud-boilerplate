import express from 'express';
import * as ctrl from '../controllers/item.controller.js';

const router = express.Router();

router.route('/')
  .get(ctrl.getItems)
  .post(ctrl.createItem);

router.route('/:id')
  .get(ctrl.getItem)
  .put(ctrl.updateItem)
  .delete(ctrl.deleteItem);

export default router;
