const router = require("express").Router()
const poll = require("../controllers/poll.controller")

router.get("/:id", poll.getById)

module.exports = router