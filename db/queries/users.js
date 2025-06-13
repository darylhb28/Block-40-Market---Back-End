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

export async function getUser({username}){
const sql = `
SELECT * FROM users WHERE username = $1
`
const {rows: [user]} = await db.query(sql, [username])
return user

}

export async function getUserById({id}){
const sql = `
SELECT * FROM users WHERE id = $1
`
const {rows:[user]} = await db.query(sql, [id])
return user
}
