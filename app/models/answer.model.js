const conn = require("./db")

const Answer = function(answer) {
    this.question_id = answer.questionId,
    this.title = answer.title
}

Answer.create = (answer, result) => {
    conn.query("INSERT INTO answer SET ?", answer, (err, res) => {
        if (err) {
            result(err, null)
            return
        }
        result(null)
    })
}

module.exports = Answer