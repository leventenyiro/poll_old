const router = require("express").Router()
const poll = require("../controllers/poll.controller")

router.get("/:id", poll.getById)
router.post("/", poll.create)
router.put("/:id", poll.update)
router.delete("/:id", poll.delete)

module.exports = router