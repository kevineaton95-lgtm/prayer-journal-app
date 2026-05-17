const express = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()
const router = express.Router()

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body

  const hashed = await bcrypt.hash(password, 10)

  const user = await prisma.user.create({
    data: { name, email, password: hashed }
  })

  res.json(user)
})

router.post("/login", async (req, res) => {
  const { email, password } = req.body

  const user = await prisma.user.findUnique({ where: { email } })

  if (!user) return res.status(400).send("User not found")

  const valid = await bcrypt.compare(password, user.password)

  if (!valid) return res.status(400).send("Wrong password")

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET)

  res.json({ token })
})

module.exports = router
