const conn = require("./db")

const Poll = function(poll) {
    this.title = poll.title
    this.answer = poll.answer
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
    var sql = `SELECT a.title, (SELECT COUNT(*) FROM poll p WHERE answer_id = a.id) AS count 
            FROM answer a
            WHERE a.question_id = 3`
    
        conn.query(sql, (err, res) => {
            if (err) {
                result(err, null)
                return
            }

            result(null, res)
        })
}

module.exports = Poll