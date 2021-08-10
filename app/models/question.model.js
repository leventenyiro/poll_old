const conn = require("./db")

const Question = function(question) {
    this.title = question.title
}

Question.create = (question, result) => {
    conn.query("INSERT INTO question SET ?", question, (err, res) => {
        if (err) {
            result(err, null)
            return
        }
        result(null, res)
    })
}

module.exports = Question