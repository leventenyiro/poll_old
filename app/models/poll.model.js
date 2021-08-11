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

        if (res.id == null) {
            result({ kind: "not_found" }, null)
            return
        }

        result(null, res[0])
    })
}

Poll.getPollById = (id, result) => {
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

Poll.create = (answerId, result) => {
    var sql = `INSERT INTO poll SET answer_id = ${answerId}`
    conn.query(sql, (err) => {
        if (err) {
            result(err, null)
            return
        }
        result(null)
    })
}

Poll.update = (id, answerId, result) => {
    conn.query(`UPDATE poll SET answer_id = ${answerId} WHERE id = ${id}`, (err, res) => {
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

Poll.delete = (id, result) => {
    conn.query(`DELETE FROM poll WHERE id = ${id}`, (err, res) => {
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

module.exports = Poll