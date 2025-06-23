import express from "express";
import { verifyToken } from "../app.js";
import { createOrder, getOrdersByUser, getOrderById } from "../db/queries/orders.js";

const router = express.Router();

// POST /orders - Create a new order
router.post("/", verifyToken, async (req, res, next) => {
  const { date, note } = req.body;

  if (!date || !note) {
    return res.status(400).send({ error: "Missing date or note" });
  }

  try {
    const newOrder = await createOrder({
      date,
      note,
      user_id: req.user.id
    });
    res.status(201).json(newOrder);
  } catch (err) {
    next(err);
  }
});

// GET /orders - Get all orders by the logged-in user
router.get("/", verifyToken, async (req, res, next) => {
  try {
    const orders = await getOrdersByUser(req.user.id);
    res.json(orders);
  } catch (err) {
    next(err);
  }
});

// GET /orders/:id - Get a specific order
router.get("/:id", verifyToken, async (req, res, next) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    return res.status(400).send({ error: "Invalid order ID" });
  }

  try {
    const order = await getOrderById(id);

    if (!order) {
      return res.status(404).send({ error: "Order not found" });
    }

    if (order.user_id !== req.user.id) {
      return res.status(403).send({ error: "Unauthorized access to this order" });
    }

    res.json(order);
  } catch (err) {
    next(err);
  }
});

export default router;
