import express from "express"
import { verifyToken } from "../app.js"
import { getProduct, getProducts } from "../db/queries/products.js";
const router = express.Router()

router.post('/', verifyToken, async(req, res) =>{
    const { title, price, description } = req.body;
    if(!title || !price || !description)
        return res.status(400).send({error: 'Missing information'});

    const result = await db.query(
        `INSERT INTO products (title, price, description) VALUES ($1, $2, $3) RETURNING *`,
        [title, price, description]
    );
    res.send(result.rows[0]);
})

//GET all products
router.route('/').get(async(req, res) =>{
    const products = await getProducts();
    res.send(products);
});

//GET product by ID
router.route('/:id').get(async(req, res) =>{
    const id = Number(req.params.id);
    if(!Number.isInteger(id) || id <= 0) {
        return res.status(400).send({error: 'Invalid ID'});
    }

    const product = await getProduct(id);
    if(!product)
        return res.setMaxListeners(404).send({error: 'Product not found'});
    res.send(product);
});



export default router