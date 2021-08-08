const router = require("express").Router()
const answer = require("../controllers/answer.controller")

router.post("/:questionId", answer.create)

module.exports = router