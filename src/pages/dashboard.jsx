import { useEffect, useState } from "react"
import axios from "axios"

export default function Dashboard() {
  const [prayers, setPrayers] = useState([])

  useEffect(() => {
    loadPrayers()
  }, [])

  const loadPrayers = async () => {
    const token = localStorage.getItem("token")

    const res = await axios.get("http://localhost:5000/api/prayers", {
      headers: { Authorization: token }
    })

    setPrayers(res.data)
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Prayer Journal</h1>

      {prayers.map(p => (
        <div key={p.id} style={{ border: "1px solid #ccc", margin: 10, padding: 10 }}>
          <h3>{p.thought}</h3>
          <p>{p.prayer}</p>
          <small>{p.bibleVerse}</small>
          <p>{p.answered ? "Answered" : "Pending"}</p>
        </div>
      ))}
    </div>
  )
}
