const Answer = require("../models/answer.model")

exports.create = (req, res) => {
    if (req.body.title == "" || req.body.title == undefined || req.body.questionId == "" || req.body.questionId == undefined)
        res.status(400).send({
            error: "Something is missing"
        })
    else {
        const answer = new Answer({
            questionId: req.body.questionId,
            title: req.body.title
        })
        Answer.create(answer, (err) => {
            if (err)
                res.status(500).send({
                    error: "Server error"
                })
            else
                res.send({
                    success: "Successful create"
                })
        })
    }
}

exports.update = (req, res) => {
    if (req.body.title == "" || req.body.title == undefined)
        res.status(400).send({
            error: "Something is missing"
        })
    else {
        const answer = new Answer({
            questionId: req.params.questionId,
            title: req.body.title
        })

        Answer.update(req.params.id, answer, (err) => {
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
    Answer.delete(req.params.id, (err) => {
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