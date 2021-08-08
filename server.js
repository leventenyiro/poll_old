const express = require('express')
const cors = require('cors')

const app = express()

var corsOptions = {
    credentials: true
    //origin: "http://localhost:8080"
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/poll", require("./app/routes/poll.route"))
app.use("/question", require("./app/routes/question.route"))
app.use("/answer", require("./app/routes/answer.route"))

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})