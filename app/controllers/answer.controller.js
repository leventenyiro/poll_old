const Answer = require("../models/answer.model")

exports.create = (req, res) => {
    if (req.body.title == "" || req.body.title == undefined)
        res.status(400).send({
            error: "Something is missing"
        })
    else {
        const answer = new Answer({
            questionId: req.params.questionId,
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