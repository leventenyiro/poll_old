const conn = require("./db")

const Answer = function(answer) {
    this.question_id = answer.questionId,
    this.title = answer.title
}

Answer.create = (answer, result) => {
    conn.query("INSERT INTO answer SET ?", answer, (err) => {
        if (err) {
            result(err, null)
            return
        }
        result(null)
    })
}

Answer.update = (id, answer, result) => {
    conn.query(`UPDATE answer SET title = ${question.title}, question_id = ${answer.question_id} WHERE id = ${id}`, (err, res) => {
        if (err) {
            result(err)
            return
        }
        
        if (res.affectedRows == 0) {
            result({ kind: "not_found" })
            return
        }

        result(null)
    })
}

Answer.delete = (id, result) => {
    conn.query(`DELETE FROM answer WHERE id = ${id}`, (err, res) => {
        if (err) {
            result(err)
            return
        }

        if (res.affectedRows == 0) {
            result({ kind: "not_found" })
            return
        }

        result(null)
    })
}

module.exports = Answer