const conn = require("./db")

const Poll = function(poll) {
    this.title = poll.title
    this.answer = poll.answer
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