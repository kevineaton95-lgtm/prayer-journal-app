const express = require("express")
const cors = require("cors")
require("dotenv").config()

const authRoutes = require("./routes/auth")
const prayerRoutes = require("./routes/prayers")

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/auth", authRoutes)
app.use("/api/prayers", prayerRoutes)

app.get("/", (req, res) => {
  res.send("Prayer Journal API Running")
})

app.listen(5000, () => {
  console.log("Server running on port 5000")
})
