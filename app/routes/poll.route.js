module.exports = app => {
    const poll = require("../controllers/poll.controller")

    app.get("/poll/:id", poll.getById)
}