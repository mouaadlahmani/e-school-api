const express = require("express");
const router = express.Router();
const articleController = require("../controller/articleController");
const upload = require("../middleWares/Upload");

// Create new article
router.post("/", upload.single("thumbnail"), articleController.createArticle);

// Get all articles with filtering, pagination, and search
router.get("/", articleController.getAllArticles);

// Get published articles only (for public viewing)
router.get("/published", articleController.getPublishedArticles);

// Get articles by category
router.get("/category/:category", articleController.getArticlesByCategory);

// Search articles
router.get("/search/:query", articleController.searchArticles);

// Get article statistics (must be above /:slug)
router.get("/:slug/stats", articleController.getArticleStats);

// Add content block to article
router.post("/:slug/content", articleController.addContentBlock);

// Reorder content blocks
router.put("/:slug/content/reorder", articleController.reorderContentBlocks);

// Update specific content block
router.put("/:slug/content/:blockIndex", articleController.updateContentBlock);

// Remove content block
router.delete("/:slug/content/:blockIndex", articleController.removeContentBlock);

// Update article status (publish/draft/archive)
router.patch("/:slug/status", articleController.updateArticleStatus);

// Update article by slug
router.put("/:slug", upload.single("thumbnail"), articleController.updateArticle);

// Delete article by slug
router.delete("/:slug", articleController.deleteArticle);

// Get single article by slug (and increment view count)
router.get("/:slug", articleController.getArticleBySlug);

module.exports = router;
