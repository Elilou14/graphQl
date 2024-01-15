const { getArticles, getOneArticle, createArticle, removeArticle, putArticle, getArticleWithComment } = require("../controller/Article.controller");
const { getCategories, getOneCategory, createCategory, getCategoryWithArticles } = require("../controller/Category.controller");
const { getComments } = require("../controller/Comment.controller");
const resolvers = {
    Query: {
      //queries Catégorie
      categories:(_, args, context, info)=>getCategories(info),
      category:(_, args, context, info)=>getOneCategory(_, args, context, info),
      //queries articles
      articles:(_, args, context, info)=>getArticles(info),
      article:(_,args,contextValue,info)=>getOneArticle(_,args,contextValue,info),
      //queries commentaires
      comments:(_,args,contextValue,info)=>getComments(_,args,contextValue,info),
    },
    Mutation:{
      addArticle:(parent,args,contextValue,info)=>createArticle(parent,args,contextValue,info),
      updateArticle:(parent,args,contextValue,info)=>putArticle(parent,args,contextValue,info),
      deleteArticle:(parent,args,contextValue,info)=>removeArticle(parent,args,contextValue,info),
      addCategory:(parent,args,contextValue,info)=>createCategory(parent,args,contextValue,info),

    }, 
    Category:{
      articles:(parent,args,contextValues,infos)=>getCategoryWithArticles(parent,args,contextValues,infos)
    },
    Article:{
      comments:(parent,args,contextValues,infos)=>getArticleWithComment(parent,args,contextValues,infos)
    }
  };

  module.exports = resolvers