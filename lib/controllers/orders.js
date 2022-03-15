const { Router } = require('express');
const Order = require('../models/Order');

module.exports = Router()
  .post('/', async (req, res) => {
    const order = await Order.insert(req.body);
    res.send(order);
  })

  .get('/:id', async (req, res) => {
    const order = await Order.getById(req.params.id);
    res.send(order);
  })

  .get('/', async (req, res) => {
    const orders = await Order.getAll();
    res.json(orders);
  })

  .patch('/:id', async (req, res, next) => {
    try {
      const updatedOrder = await Order.updateById(req.params.id, req.body);
      if (!updatedOrder) {
        const error = new Error(`Order ${req.params.id} not found`);
        error.status = 404;
        throw error;
      }

      res.json(updatedOrder);
    } catch (error) {
      next(error);
    }
  })

  .delete('/:id', async (req, res) => {
    const order = await Order.deleteById(req.params.id);
    res.json(order);
  });
