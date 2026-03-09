const express = require("express");
const router = express.Router();
const { requireAuth } = require("../middlewares/authMiddleware");

const articleController = require("../controllers/articleController");

router.get('/articles', requireAuth, articleController.index);

router.get('/articles/create', requireAuth, articleController.create);
router.post('/articles', requireAuth, articleController.store);

router.get('/articles/:id/edit', requireAuth, articleController.edit);
router.post('/articles/:id', requireAuth, articleController.update);

router.post('/articles/:id/delete', requireAuth, articleController.destroy);

module.exports = router