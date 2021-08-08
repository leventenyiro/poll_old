const router = require("express").Router()
const question = require("../controllers/question.controller")

router.post("/", question.create)

module.exports = router