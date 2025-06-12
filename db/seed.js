import db from "./client.js"
import { products, reviews } from "./seeddata.js"
import { createProduct } from "./queries/products.js";
import { createUser } from "./queries/users.js";
import { createOrder } from "./queries/orders.js";
import { createReview } from "./queries/reviews.js";


await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed(){

const newUser = await createUser({
    username: "user1",
    password: "1234"
})

await createOrder({
    date: "2025-01-01",
    note: "2 House Espresso, 1 Decaf Colombian",
    user_id: newUser.id
})

for (const product of products){
    await createProduct(product)
}

for (const review of reviews){
    await createReview(review)
}

}