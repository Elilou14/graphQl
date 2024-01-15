const {gql} = require('apollo-server-express');
const typeDefs = gql`

  type Article {
   "ce champ represente l'id de l'article"
    id: ID!
    title: String!
    content: String!
    author: String!
    categoryId:ID
    createdAt:String
    comments:[Comment]
  }

  type Category{
    id:ID!
    name: String!
    articles: [Article]
  }

  type Query {
    "catégorie"
    categories:[Category]!
    category(id:ID!):Category
    "article"
    articles: [Article]
    article(id:ID!):Article
    "commentaire"
    comments:[Comment]!
  }
  # ce type est encore visible
  type Comment{
    """
      commentaire multi lignes ici
      commentaire multi lignes ici
      commentaire multi lignes ici
      commentaire multi lignes ici
    """
    id:ID!
    author:String!
    "ici un commentaire mono ligne"
    content:String!
    createdAt:String
    articleId:ID
  }
  "input pour les ajout ou modification"
  input InputArticle{
    title: String!
    content: String!
    author: String!
    categoryId:ID!
  }
  input InputCategory{
    name:String!
  }

  type Mutation{
    addArticle(article:InputArticle):Article,
    updateArticle(id:ID!,article:InputArticle!):Article,
    deleteArticle(id:ID):Article,
    addCategory(category:InputCategory):Category
  }
`;
module.exports = typeDefs
