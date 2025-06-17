const Article = require("../model/Article");
const generateSlug = require("../config/Slugify");

const createArticle = async (data, file) => {
  try {
    if (file) {
      data.thumbnail = `/uploads/${file.filename}`;
    }

    if (data.title) {
      data.slug = generateSlug(data.title);
    }

    if (Array.isArray(data.content)) {
      data.content = data.content.map((block, index) => ({
        ...block,
        order: block.order ?? index + 1
      }));
    }

    const article = new Article(data);
    return await article.save();
  } catch (error) {
    throw new Error(`Failed to create article: ${error.message}`);
  }
};

const getAllArticles = async (options = {}) => {
  try {
    const {
      page = 1,
      limit = 10,
      category,
      status,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      search
    } = options;

    let query = {};

    if (category) {
      query.category = new RegExp(category, 'i');
    }

    if (status) {
      query.status = status;
    }

    if (search) {
      query.$or = [
        { title: new RegExp(search, 'i') },
        { description: new RegExp(search, 'i') },
      ];
    }

    const skip = (page - 1) * limit;
    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const articles = await Article.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit)
      .lean();

    const totalArticles = await Article.countDocuments(query);
    const totalPages = Math.ceil(totalArticles / limit);

    return {
      articles: articles.map(article => ({
        ...article,
        summary: true
      })),
      currentPage: page,
      totalPages,
      totalArticles,
      hasNext: page < totalPages,
      hasPrev: page > 1
    };
  } catch (error) {
    throw new Error(`Failed to get articles: ${error.message}`);
  }
};

const getPublishedArticles = async (options = {}) => {
  try {
    const {
      page = 1,
      limit = 10,
      category,
      sortBy = 'publishedAt',
      sortOrder = 'desc'
    } = options;

    let query = { status: 'published' };

    if (category) {
      query.category = new RegExp(category, 'i');
    }

    const skip = (page - 1) * limit;
    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const articles = await Article.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit)
      .select('-content')
      .lean();

    const totalArticles = await Article.countDocuments(query);
    const totalPages = Math.ceil(totalArticles / limit);

    return {
      articles,
      currentPage: page,
      totalPages,
      totalArticles,
      hasNext: page < totalPages,
      hasPrev: page > 1
    };
  } catch (error) {
    throw new Error(`Failed to get published articles: ${error.message}`);
  }
};

const getArticlesByCategory = async (category, options = {}) => {
  try {
    const { page = 1, limit = 10 } = options;

    const query = {
      category: new RegExp(category, 'i'),
      status: 'published'
    };

    const skip = (page - 1) * limit;

    const articles = await Article.find(query)
      .sort({ publishedAt: -1 })
      .skip(skip)
      .limit(limit)
      .select('-content')
      .lean();

    const totalArticles = await Article.countDocuments(query);
    const totalPages = Math.ceil(totalArticles / limit);

    return {
      articles,
      currentPage: page,
      totalPages,
      totalArticles
    };
  } catch (error) {
    throw new Error(`Failed to get articles by category: ${error.message}`);
  }
};

const searchArticles = async (searchQuery, options = {}) => {
  try {
    const { page = 1, limit = 10 } = options;

    const query = {
      status: 'published',
      $or: [
        { title: new RegExp(searchQuery, 'i') },
        { description: new RegExp(searchQuery, 'i') },
        { 'content.text': new RegExp(searchQuery, 'i') }
      ]
    };

    const skip = (page - 1) * limit;

    const articles = await Article.find(query)
      .sort({ publishedAt: -1 })
      .skip(skip)
      .limit(limit)
      .select('-content')
      .lean();

    const totalArticles = await Article.countDocuments(query);
    const totalPages = Math.ceil(totalArticles / limit);

    return {
      articles,
      currentPage: page,
      totalPages,
      totalArticles
    };
  } catch (error) {
    throw new Error(`Failed to search articles: ${error.message}`);
  }
};

const getArticleBySlug = async (slug, incrementView = true) => {
  try {
    const article = await Article.findOne({ slug });

    if (!article) return null;

    if (incrementView) {
      await article.incrementViews();
    }

    return article;
  } catch (error) {
    throw new Error(`Failed to get article: ${error.message}`);
  }
};

const updateArticle = async (slug, updateData, file) => {
  try {
    // Handle thumbnail upload
    if (file) {
      updateData.thumbnail = `/uploads/${file.filename}`;
    }

    // Handle new slug if title changes
    if (updateData.title) {
      updateData.slug = generateSlug(updateData.title);
    }

    // Parse stringified fields if sent as JSON from FormData
    if (typeof updateData.content === "string") {
      updateData.content = JSON.parse(updateData.content);
    }

    if (Array.isArray(updateData.content)) {
      updateData.content = updateData.content.map((block, index) => ({
        ...block,
        order: block.order || index + 1,
      }));
    }

    return await Article.findOneAndUpdate(
      { slug },
      updateData,
      { new: true, runValidators: true }
    );
  } catch (error) {
    throw new Error(`Failed to update article: ${error.message}`);
  }
};

const updateArticleStatus = async (slug, status) => {
  try {
    const validStatuses = ['draft', 'published', 'archived'];
    if (!validStatuses.includes(status)) {
      throw new Error(`Invalid status. Must be one of: ${validStatuses.join(', ')}`);
    }

    const updateData = { status };
    if (status === 'published') {
      updateData.publishedAt = new Date();
    }

    return await Article.findOneAndUpdate(
      { slug },
      updateData,
      { new: true, runValidators: true }
    );
  } catch (error) {
    throw new Error(`Failed to update article status: ${error.message}`);
  }
};

const addContentBlock = async (slug, blockData) => {
  try {
    const article = await Article.findOne({ slug });
    if (!article) return null;

    const maxOrder = article.content.length > 0
      ? Math.max(...article.content.map(block => block.order || 0))
      : 0;

    blockData.order = maxOrder + 1;
    article.content.push(blockData);

    return await article.save();
  } catch (error) {
    throw new Error(`Failed to add content block: ${error.message}`);
  }
};

const updateContentBlock = async (slug, blockIndex, blockData) => {
  try {
    const article = await Article.findOne({ slug });
    if (!article || !article.content[blockIndex]) return null;

    article.content[blockIndex] = {
      ...article.content[blockIndex].toObject(),
      ...blockData
    };

    return await article.save();
  } catch (error) {
    throw new Error(`Failed to update content block: ${error.message}`);
  }
};

const removeContentBlock = async (slug, blockIndex) => {
  try {
    const article = await Article.findOne({ slug });
    if (!article || !article.content[blockIndex]) return null;

    article.content.splice(blockIndex, 1);
    article.content.forEach((block, index) => {
      block.order = index + 1;
    });

    return await article.save();
  } catch (error) {
    throw new Error(`Failed to remove content block: ${error.message}`);
  }
};

const reorderContentBlocks = async (slug, newOrder) => {
  try {
    const article = await Article.findOne({ slug });
    if (!article) return null;

    if (!Array.isArray(newOrder) || newOrder.length !== article.content.length) {
      throw new Error('Invalid order array');
    }

    const reorderedContent = newOrder.map((oldIndex, newIndex) => {
      const block = article.content[oldIndex];
      block.order = newIndex + 1;
      return block;
    });

    article.content = reorderedContent;
    return await article.save();
  } catch (error) {
    throw new Error(`Failed to reorder content blocks: ${error.message}`);
  }
};

const deleteArticle = async (slug) => {
  try {
    return await Article.findOneAndDelete({ slug });
  } catch (error) {
    throw new Error(`Failed to delete article: ${error.message}`);
  }
};

const getArticleStats = async (slug) => {
  try {
    const article = await Article.findOne({ slug }).select('title viewCount readingTime publishedAt createdAt status');
    if (!article) return null;

    return {
      title: article.title,
      viewCount: article.viewCount,
      readingTime: article.readingTime,
      publishedAt: article.publishedAt,
      createdAt: article.createdAt,
      status: article.status,
      daysPublished: article.publishedAt
        ? Math.floor((new Date() - article.publishedAt) / (1000 * 60 * 60 * 24))
        : 0
    };
  } catch (error) {
    throw new Error(`Failed to get article stats: ${error.message}`);
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
  getArticleStats
};
