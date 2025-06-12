import db from "../../db/client.js"
import bcrypt from "bcrypt"

export async function createUser({username, password}){
const hashedPassword = await bcrypt.hash(password, 5)
const sql = `
INSERT INTO users (username, password)
VALUES ($1, $2) 
RETURNING *;
`
const {rows: [user]} = await db.query(sql, [username, hashedPassword])
return user
}
