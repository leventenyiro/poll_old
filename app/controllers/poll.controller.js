const Poll = require("../models/poll.model")

exports.getById = (req, res) => {
    Poll.getNameById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found")
                res.status(404).send({
                    error: "No poll with id"
                })
            else
                res.status(500).send({
                    error: "serverError"
                })
        } else {
            Poll.getPollById(req.params.id, (err2, answers) => {
                if (err)
                    res.status(500).send({
                        error: "serverError"
                    })
                else {
                    data.answers = answers
                    res.send(data)
                }
                
            })            
        }
    })
}