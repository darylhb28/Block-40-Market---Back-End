import db from "../../db/client.js"

//Get All Products
export async function getProducts(){
    const sql =`
    SELECT * FROM products ORDER BY id;
    `
    const {rows} = await db.query(sql);
    return rows;
};

//GET Product by ID
export async function getProduct(id){
    const sql =`
    SELECT * FROM products WHERE id = $1;
    `
    const {rows} = await db.query(sql, [id]);
    return rows[0]
};

//Create Product
export async function createProduct({title, description, price, image_url}){
const sql =  `
INSERT INTO products (title, description, price, image_url)
VALUES ($1, $2, $3, $4)
RETURNING *
`
const {rows: [product]} = await db.query(sql, [title, description, price, image_url])
return product
}

//Update Products
export async function updateProduct({ id, title, price, description }){
    const sql = `
    UPDATE products
    SET title = $1, price = $2, decription = $3
    WHERE id = $4
    RETURNING *;
    `
    const {rows} = await db.quewry(sql, [title, price, description, id]);
    return rows[0];
}

//DELETE Products
export async function deleteProduct(id){
    const sql =`
    DELETE FROM products WHERE id = $1 RETURNING *;
    `
    const {rows} = await db.query(sql, [id]);
    return rows[0]
}

