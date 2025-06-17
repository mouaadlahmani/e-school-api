const articleService = require("../service/articleService");

// Helper to parse pagination and filters
const getQueryOptions = (query, defaults = {}) => ({
  page: parseInt(query.page || defaults.page || 1),
  limit: parseInt(query.limit || defaults.limit || 10),
  category: query.category,
  status: query.status,
  sortBy: query.sortBy || defaults.sortBy || "createdAt",
  sortOrder: query.sortOrder || defaults.sortOrder || "desc",
  search: query.search
});

// Create
const createArticle = async (req, res) => {
  try {
    const data = { ...req.body };
    const file = req.file;

    if (typeof data.content === "string") {
      data.content = JSON.parse(data.content);
    }

    if (typeof data.tags === "string") {
      data.tags = JSON.parse(data.tags);
    }

    const article = await articleService.createArticle(data, file);
    res.status(201).json({ success: true, message: "Article created successfully", data: article });
  } catch (err) {
    console.error("Create Article Error:", err);
    res.status(400).json({ success: false, error: err.message });
  }
};

// All articles
const getAllArticles = async (req, res) => {
  try {
    const options = getQueryOptions(req.query);
    const result = await articleService.getAllArticles(options);
    res.status(200).json({
      success: true,
      data: result.articles,
      pagination: {
        currentPage: result.currentPage,
        totalPages: result.totalPages,
        totalArticles: result.totalArticles,
        hasNext: result.hasNext,
        hasPrev: result.hasPrev
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Published
const getPublishedArticles = async (req, res) => {
  try {
    const options = getQueryOptions(req.query, { sortBy: "publishedAt" });
    const result = await articleService.getPublishedArticles(options);
    res.status(200).json({
      success: true,
      data: result.articles,
      pagination: {
        currentPage: result.currentPage,
        totalPages: result.totalPages,
        totalArticles: result.totalArticles,
        hasNext: result.hasNext,
        hasPrev: result.hasPrev
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// By category
const getArticlesByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const options = getQueryOptions(req.query);
    const result = await articleService.getArticlesByCategory(category, options);
    res.status(200).json({
      success: true,
      data: result.articles,
      pagination: {
        currentPage: result.currentPage,
        totalPages: result.totalPages,
        totalArticles: result.totalArticles
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Search
const searchArticles = async (req, res) => {
  try {
    const { query } = req.params;
    const options = getQueryOptions(req.query);
    const result = await articleService.searchArticles(query, options);
    res.status(200).json({
      success: true,
      data: result.articles,
      pagination: {
        currentPage: result.currentPage,
        totalPages: result.totalPages,
        totalArticles: result.totalArticles
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Single article by slug
const getArticleBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const article = await articleService.getArticleBySlug(slug, req.query.incrementView === 'true');
    if (!article) {
      return res.status(404).json({ success: false, message: "Article not found" });
    }
    res.status(200).json({ success: true, data: article });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Update article
const updateArticle = async (req, res) => {
  try {
    const slug = req.params.slug;
    const updated = await articleService.updateArticle(slug, req.body, req.file);

    if (!updated) {
      return res.status(404).json({ success: false, message: "Article not found" });
    }

    res.status(200).json({
      success: true,
      message: "Article updated successfully",
      data: updated,
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// Status update
const updateArticleStatus = async (req, res) => {
  try {
    const updated = await articleService.updateArticleStatus(req.params.slug, req.body.status);
    if (!updated) {
      return res.status(404).json({ success: false, message: "Article not found" });
    }
    res.status(200).json({ success: true, message: `Article ${req.body.status} successfully`, data: updated });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// Add block
const addContentBlock = async (req, res) => {
  try {
    const updated = await articleService.addContentBlock(req.params.slug, req.body);
    if (!updated) return res.status(404).json({ success: false, message: "Article not found" });
    res.status(200).json({ success: true, message: "Content block added successfully", data: updated });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// Update block
const updateContentBlock = async (req, res) => {
  try {
    const updated = await articleService.updateContentBlock(req.params.slug, parseInt(req.params.blockIndex), req.body);
    if (!updated) return res.status(404).json({ success: false, message: "Article or content block not found" });
    res.status(200).json({ success: true, message: "Content block updated successfully", data: updated });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// Remove block
const removeContentBlock = async (req, res) => {
  try {
    const updated = await articleService.removeContentBlock(req.params.slug, parseInt(req.params.blockIndex));
    if (!updated) return res.status(404).json({ success: false, message: "Article or content block not found" });
    res.status(200).json({ success: true, message: "Content block removed successfully", data: updated });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// Reorder blocks
const reorderContentBlocks = async (req, res) => {
  try {
    const updated = await articleService.reorderContentBlocks(req.params.slug, req.body.newOrder);
    if (!updated) return res.status(404).json({ success: false, message: "Article not found" });
    res.status(200).json({ success: true, message: "Content blocks reordered successfully", data: updated });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// Delete
const deleteArticle = async (req, res) => {
  try {
    const deleted = await articleService.deleteArticle(req.params.slug);
    if (!deleted) return res.status(404).json({ success: false, message: "Article not found" });
    res.status(200).json({ success: true, message: "Article deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Stats
const getArticleStats = async (req, res) => {
  try {
    const stats = await articleService.getArticleStats(req.params.slug);
    if (!stats) return res.status(404).json({ success: false, message: "Article not found" });
    res.status(200).json({ success: true, data: stats });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = {
  createArticle,
  getAllArticles,
  getPublishedArticles,
  getArticlesByCategory,
  searchArticles,
  getArticleBySlug,
  updateArticle,
  updateArticleStatus,
  addContentBlock,
  updateContentBlock,
  removeContentBlock,
  reorderContentBlocks,
  deleteArticle,
  getArticleStats,
};
