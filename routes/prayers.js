const express = require("express")
const { PrismaClient } = require("@prisma/client")
const auth = require("../middleware/auth")

const prisma = new PrismaClient()
const router = express.Router()

router.post("/", auth, async (req, res) => {
  const prayer = await prisma.prayer.create({
    data: {
      thought: req.body.thought,
      prayer: req.body.prayer,
      bibleVerse: req.body.bibleVerse,
      userId: req.user.id
    }
  })

  res.json(prayer)
})

router.get("/", auth, async (req, res) => {
  const prayers = await prisma.prayer.findMany({
    where: { userId: req.user.id },
    orderBy: { createdAt: "desc" }
  })

  res.json(prayers)
})

router.put("/:id/answered", auth, async (req, res) => {
  const updated = await prisma.prayer.update({
    where: { id: Number(req.params.id) },
    data: { answered: true }
  })

  res.json(updated)
})

module.exports = router
