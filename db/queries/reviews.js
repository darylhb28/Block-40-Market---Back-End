import db from "../../db/client.js"

export async function createReview({rating, comment, product_id, user_id}){
const sql = `
INSERT INTO reviews (rating, comment, product_id, user_id)
VALUES ($1, $2, $3, $4)
RETURNING *;
`
const {rows:[review]} = await db.query(sql, [rating, comment, product_id, user_id])
return review

}

export async function getReviewByProductId(product_id){
    const result = await db.query('SELECT * FROM reviews WHERE product_id = $1;',
    [product_id]);
    return result.rows;
}