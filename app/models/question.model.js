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

Question.update = (id, question, result) => {
    conn.query(`UPDATE question SET title = ${question.title} WHERE id = ${id}`, (err, res) => {
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

Question.delete = (id, result) => {
    conn.query(`DELETE FROM question WHERE id = ${id}`, (err, res) => {
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

module.exports = Question