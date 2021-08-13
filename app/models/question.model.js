const conn = require("./db")

const Question = function(question) {
    this.title = question.title
}

Question.getAll = result => {
    conn.query("SELECT * FROM question", (err, res) => {
        if (err) {
            result(err, null)
            return
        }

        result(null, res)
    })
}

Question.getNameById = (id, result) => {
    var sql = `SELECT q.id, q.title, COUNT(*) AS votes FROM poll p
        LEFT JOIN answer a ON p.answer_id = a.id
        LEFT JOIN question q ON a.question_id = q.id
        WHERE q.id = ${id}`
    
    conn.query(sql, (err, res) => {
        if (err) {
            result(err, null)
            return
        }

        //if (res.id === null) {
            result({ kind: "not_found" }, null)
            return
        //}

        result(null, res[0])
    })
}

Question.getPollById = (id, result) => {
    var sql = `SELECT a.id, a.title, (SELECT COUNT(*) FROM poll p WHERE answer_id = a.id) AS count 
            FROM answer a
            WHERE a.question_id = ${id}`
    
    conn.query(sql, (err, res) => {
        if (err) {
            result(err, null)
            return
        }

        result(null, res)
    })
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
    conn.query(`UPDATE question SET title = "${question.title}" WHERE id = ${id}`, (err, res) => {
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