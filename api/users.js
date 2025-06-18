import express from "express"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { createUser, getUser, getUserById } from "../db/queries/users.js"
import { verifyToken } from "../app.js"
const router = express.Router()
export default router

//POST /users/register
router.route("/register").post(async(req, res, next)=>{
const {username, password} = req.body

if (!username || !password) {
    return res.status(400)("Missing username or password")
}

const newUser = await createUser({username, password})
const token = jwt.sign({id: newUser.id, username: newUser.username}, process.env.JWT_SECRET)

res.status(200).send(token)
})

//POST /users/login
router.route("/login").post(async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send("Missing username or password");
  }

  const realUserInfo = await getUser({ username });

  if (!realUserInfo) {
    return res.status(401).send("Wrong login info");
  }

  const isMatch = await bcrypt.compare(password, realUserInfo.password);

  if (!isMatch) {
    return res.status(401).send("Wrong login info");
  }

  const token = jwt.sign(
    { id: realUserInfo.id, username: realUserInfo.username },
    process.env.JWT_SECRET
  );
  res.status(200).send(token);
});


//🔒 GET /users/me
router.route("/me").get(verifyToken, async(req,res,next)=>{
const userInfo = await getUserById({id: req.user.id})
res.status(200).send(userInfo)

})