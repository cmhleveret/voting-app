const express = require("express");

const router = express.Router();
const polls = require("../controllers/pollController");

router.put("/vote/:pollId", polls.vote);
router.get("/", polls.index);

router.post("/create", polls.create);
router.delete("/:pollId", polls.delete);

module.exports = router;
