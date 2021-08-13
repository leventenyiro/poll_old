const router = require("express").Router()
const question = require("../controllers/question.controller")

router.get("/", question.getAll)
router.get("/:id", question.getById)
router.post("/", question.create)
router.put("/:id", question.update)
router.delete("/:id", question.delete)

module.exports = router