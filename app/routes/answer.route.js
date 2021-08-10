const router = require("express").Router()
const answer = require("../controllers/answer.controller")

router.post("/:questionId", answer.create)
router.put("/:id", answer.update)
router.delete("/:id", answer.delete)

module.exports = router