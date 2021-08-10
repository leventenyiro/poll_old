const conn = require("./db")

const Poll = function(poll) {
    this.title = poll.title
    this.answer = poll.answer
}

Poll.getNameById = (id, result) => {
    var sql = `SELECT q.id, q.title, COUNT(*) AS votes FROM poll p
        LEFT JOIN answer a ON p.answer_id = a.id
        LEFT JOIN question q ON a.question_id = q.id
        WHERE q.id = ${id}`
    
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
    var sql = `SELECT a.title, (SELECT COUNT(*) FROM poll p WHERE answer_id = a.id) AS count 
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

Poll.create = (id, result) => {
    var sql = `INSERT INTO poll SET answer_id = ${id}`
    conn.query(sql, (err) => {
        if (err) {
            result(err, null)
            return
        }
        result(null)
    })
}

module.exports = Poll