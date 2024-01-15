const { ApolloServer,gql } = require('apollo-server-express');
const express = require('express');
const typeDefs = require('./graphql/schema');
const resolvers = require('./graphql/resolvers')

const app = express();

const server = new ApolloServer({ 
  typeDefs, 
  resolvers,
  plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
  context:({req})=>{
    return req
  }
 });
 
async function startApolloServer() {
    await server.start();
    server.applyMiddleware({ app });

    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}${server.graphqlPath}`);
    });
  }
  startApolloServer();