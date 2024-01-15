const { getArticles, getOneArticle, createArticle, removeArticle, putArticle, getArticleWithComment } = require("../controller/Article.controller");
const { getCategories, getOneCategory, createCategory, getCategoryWithArticles } = require("../controller/Category.controller");
const { getComments } = require("../controller/Comment.controller");
const resolvers = {
    Query: {

    }
  };

  module.exports = resolvers