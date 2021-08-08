const conn = require("./db")

const Poll = function(poll) {
    this.question = poll.question
    this.answers = poll.answers // list key=>value
}

Poll.getNameById = (id, result) => {
    var sql = `SELECT * FROM question WHERE id = ${id}`
    
    conn.query(sql, (err, res) => {
        if (err) {
            result(err, null)
            return
        }

        if (res.length) {
            result(null, res[0])
            return
        }

        result({ kind: "not_found" }, null)
    })
}

Poll.getPollById = (id, result) => {
    var sql = `SELECT a.answer, count(a.id) AS votes FROM poll p
        INNER JOIN answer a ON p.answer_id = a.id
        WHERE a.question_id = ${id}
        GROUP BY a.id`
    
        conn.query(sql, (err, res) => {
            if (err) {
                result(err, null)
                return
            }

            result(null, res)
        })
}

/*
SELECT q.id, q.text, a.answer, count(a.id) FROM poll p
INNER JOIN answer a ON p.answer_id = a.id
INNER JOIN question q ON a.question_id = q.id
WHERE a.question_id = 1
GROUP BY a.id
*/

module.exports = Poll