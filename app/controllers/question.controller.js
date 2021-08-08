const Question = require("../models/question.model")

exports.create = (req, res) => {
    if (req.body.title == "" || req.body.title == undefined)
        res.status(400).send({
            error: "Something is missing"
        })
    else {
        const question = new Question({
            title: req.body.title
        })
        
        Question.create(question, (err) => {
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