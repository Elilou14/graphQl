const {gql} = require('apollo-server-express');
const typeDefs = gql`


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
`;
module.exports = typeDefs
