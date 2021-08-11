const router = require("express").Router()
const poll = require("../controllers/poll.controller")

router.get("/:id", poll.getById)
router.post("/:answerId", poll.create) // jobb lenne paramsban

module.exports = router