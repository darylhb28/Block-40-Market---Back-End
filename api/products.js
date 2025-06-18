import express from "express"
import { verifyToken } from "../app.js"
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from "../db/queries/products.js";
import { createReview, getReviewByProductId } from "../db/queries/reviews.js";
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
        return res.status(404).send({error: 'Product not found'});
    res.send(product);
});

//POST create new product
router.route("/").post(async(req, res) =>{
    const { title, price, description} = req.body;
    if (!title || !price || !description){
        return res.status(400).send({error: "Missing required fields"});
    }

    const newProduct = await createProduct({ title, price, description});
    res.status(201).send(newProduct);
});

//PUT update products
router.route("/:id").put(async(req, res)=>{
    const id = Number(req.params.id);
    const {title, price, description} = req.body;

    if(!title || !price || !description || !Number.isInteger(id) || id <= 0) {
        return res.status(400).send({error: "Invalid Input"});
    }

    const existing = await getProduct(id);
    if(!existing) return res.status(404).send({error: "Product not found"});

    const updated = await updateProduct({id, title, price, description});
    res.send(updated);
});

//DELETE delete product
router.route("/:id").delete(async(req, res) =>{
    const id = Number(req.params.id);
    if(!Number.isInteger(id) || id <= 0) {
        return res.status(400).send({error: "Invalid Id"});
    }

    const deleted = await deleteProduct(id);
    if(!deleted) return res.status(404).send({error: "Product not found"});

    res.sendStatus(204);
})

//GET product review by product id
router.route("/:id/reviews").get(async(req, res) => {
    const id = Number(req.params.id);
    if(!Number.isInteger(id) || id <= 0) {
        return res.status(400).send({error: 'Invalid ID'});
    }

    const review = await getReviewByProductId(id);
    if(!review)
        return res.status(404).send({error: 'Product not found'});
    
    res.status(200).send(review);
})


// POST create new review by product id
router.route("/:id/reviews").post(verifyToken, async(req, res) => {
    const id = Number(req.params.id);
    if(!Number.isInteger(id) || id <= 0) {
        return res.status(400).send({error: 'Invalid ID'});
    }

    const product = await getProduct(id);
    if(!product)
        return res.status(404).send({error: 'Product not found'});

    const { rating, comment } = req.body;
    if (!rating || !comment ){
        return res.status(400).send({error: "Missing required fields"});
    }

    const newReview = await createReview({ rating, comment, product_id: id, user_id: req.user.id });
    res.status(201).send(newReview);
})



export default router