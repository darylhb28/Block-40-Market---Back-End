import express from 'express'
import jwt from "jsonwebtoken"
const app = express()
export default app
import usersRouter from "./api/users.js"
import productsRouter from "./api/products.js"
import ordersRouter from "./api/orders.js"

app.use(express.json())

app.use("/users", usersRouter)

app.use("/products", productsRouter)

app.use("/orders", ordersRouter)


app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Sorry! Something went wrong.");
});

export function verifyToken(req, res, next){
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];

  if (!token) {
    return res.status(401).send("Missing authorization token")
  }

    const decodedJWT = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedJWT;

  if (!req.user) {
      return res.status(401).send("Invalid token");
  }

 next();

}