const mongoose = require("mongoose");
const generateSlug = require("../config/Slugify");

// Sub-schema for rich content blocks
const ContentBlockSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['text', 'image', 'youtube', 'heading', 'quote', 'list']
  },
  order: {
    type: Number,
    required: true
  },
  text: {
    type: String,
    default: ""
  },
  formatting: {
    bold: { type: Boolean, default: false },
    italic: { type: Boolean, default: false },
    underline: { type: Boolean, default: false },
    color: { type: String, default: "#000000" },
    fontSize: { type: String, default: "16px" },
    alignment: { 
      type: String, 
      enum: ['left', 'center', 'right', 'justify'], 
      default: 'left' 
    }
  },
  links: [{
    text: { type: String, required: true },
    url: { type: String, required: true },
    startIndex: { type: Number, required: true },
    endIndex: { type: Number, required: true },
    openInNewTab: { type: Boolean, default: true }
  }],
  image: {
    url: { type: String },
    alt: { type: String },
    caption: { type: String },
    width: { type: String, default: "100%" },
    height: { type: String, default: "auto" },
    alignment: { 
      type: String, 
      enum: ['left', 'center', 'right'], 
      default: 'center' 
    }
  },
  youtube: {
    videoId: { type: String },
    title: { type: String },
    width: { type: String, default: "100%" },
    height: { type: String, default: "315px" },
    autoplay: { type: Boolean, default: false },
    controls: { type: Boolean, default: true },
    startTime: { type: Number, default: 0 }
  },
  heading: {
    level: { type: Number, min: 1, max: 6, default: 2 },
    text: { type: String }
  },
  quote: {
    text: { type: String },
    author: { type: String },
    source: { type: String }
  },
  list: {
    type: { type: String, enum: ['ordered', 'unordered'], default: 'unordered' },
    items: [{ type: String }]
  }
}, { _id: false });

const ArticleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500
    },
    content: [ContentBlockSchema],
    category: {
      type: String,
      required: true,
      trim: true
    },
    thumbnail: {
      url: { type: String, default: "" },
      alt: { type: String, default: "" },
      caption: { type: String, default: "" }
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    status: {
      type: String,
      enum: ['draft', 'published', 'archived'],
      default: 'draft'
    },
    publishedAt: {
      type: Date
    },
    scheduledAt: {
      type: Date
    },
    readingTime: {
      type: Number,
      default: 0
    },
    viewCount: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

// Pre-save middleware
ArticleSchema.pre("validate", function (next) {
  if (this.title && !this.slug) {
    this.slug = generateSlug(this.title);
  }

  if (this.content && this.content.length > 0) {
    let totalWords = 0;
    this.content.forEach(block => {
      if (block.text) totalWords += block.text.split(' ').length;
      if (block.heading?.text) totalWords += block.heading.text.split(' ').length;
      if (block.quote?.text) totalWords += block.quote.text.split(' ').length;
      if (block.list?.items) {
        block.list.items.forEach(item => totalWords += item.split(' ').length);
      }
    });
    this.readingTime = Math.ceil(totalWords / 225);
  }

  if (this.status === 'published' && !this.publishedAt) {
    this.publishedAt = new Date();
  }

  next();
});

// Indexes
ArticleSchema.index({ slug: 1 });
ArticleSchema.index({ category: 1, status: 1 });
ArticleSchema.index({ status: 1, publishedAt: -1 });

const Article = mongoose.model("Article", ArticleSchema);
module.exports = Article;
