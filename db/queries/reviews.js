import db from "../../db/client.js"

export async function createReview({rating, comment, product_id}){
const sql = `
INSERT INTO reviews (rating, comment, product_id)
VALUES ($1, $2, $3)
RETURNING *;
`
const {rows:[review]} = await db.query(sql, [rating, comment, product_id])
return review

}