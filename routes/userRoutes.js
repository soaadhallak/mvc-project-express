const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { validateQuery } = require("../middlewares/validateQuery");
const searchUserSchema = require("../validations/users/searchUserValidation");

router.get("/search", userController.search);

module.exports = router;
