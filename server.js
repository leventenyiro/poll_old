const express = require('express')
const cors = require('cors')
const path = require('path')
const app = express()

var corsOptions = {
    credentials: true
    //origin: "http://localhost:8080"
}

app.use(express.static(path.resolve(__dirname, './client/web/build')))

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/poll", require("./app/routes/poll.route"))
app.use("/question", require("./app/routes/question.route"))
app.use("/answer", require("./app/routes/answer.route"))

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, './client/web/build', 'index.html'))
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`)
})