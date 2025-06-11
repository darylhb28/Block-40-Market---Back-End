import db from "../../db/client.js"

export async function createProduct({title, description, price, image_url}){
const sql =  `
INSERT INTO products (title, description, price, image_url)
VALUES ($1, $2, $3, $4)
RETURNING *
`
const {rows: [product]} = await db.query(sql, [title, description, price, image_url])
return product

}