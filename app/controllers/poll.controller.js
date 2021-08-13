const Poll = require("../models/poll.model")

exports.create = (req, res) => {
    if (req.body.answerId == "" || req.body.answerId == undefined)
        res.status(400).send({
            error: "Something is missing"
        })
    else {
        Poll.create(req.body.answerId, (err) => {
            if (err)
                res.status(500).send({
                    error: "Server error"
                })
            else
                res.send({
                    success: "Successful vote"
                })
        })
    }
}

exports.update = (req, res) => {
    if (req.body.answerId == "" || req.body.answerId)
        res.status(400).send({
            error: "Something is missing"
        })
    else {
        Poll.update(req.params.id, req.body.answerId, (err) => {
            if (err) {
                if (err.kind === "not_found")
                    res.status(404).send({
                        error: "Unsuccessful update"
                    })
                else
                    res.status(500).send({
                        error: "Server error"
                    })
            } else
                res.send({
                    success: "Successful update"
                })
        })
    }
}

exports.delete = (req, res) => {
    Poll.delete(req.params.id, (err) => {
        if (err) {
            if (err.kind === "not_found")
                res.status(404).send({
                    error: "Unsuccessful delete"
                })
            else
                res.status(500).send({
                    error: "Server error"
                })
        } else
            res.send({
                success: "Successful delete"
            })
    })
}