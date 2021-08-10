const conn = require("./db")

const Question = function(question) {
    this.title = question.title
}

Question.create = (question, result) => {
    conn.query("INSERT INTO question SET ?", question, (err) => {
        if (err) {
            result(err, null)
            return
        }
        result(null)
    })
}

module.exports = Question