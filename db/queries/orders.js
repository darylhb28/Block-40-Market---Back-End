import db from "../client.js";

// Create a new order
export async function createOrder({ date, note, user_id }) {
  const sql = `
    INSERT INTO orders (date, note, user_id)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
  const values = [date, note, user_id];
  const { rows: [order] } = await db.query(sql, values);
  return order;
}

// Get all orders for a user
export async function getOrdersByUser(user_id) {
  const sql = `
    SELECT * FROM orders
    WHERE user_id = $1
    ORDER BY id;
  `;
  const { rows } = await db.query(sql, [user_id]);
  return rows;
}

// Get one order by ID
export async function getOrderById(id) {
  const sql = `
    SELECT * FROM orders
    WHERE id = $1;
  `;
  const { rows: [order] } = await db.query(sql, [id]);
  return order;
}