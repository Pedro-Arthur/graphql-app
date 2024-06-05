const express = require("express");
const router = express.Router();

const mockUsers = require("../mocks/users");

router.get("/", (req, res) => {
  res.json(mockUsers);
});

module.exports = router;
