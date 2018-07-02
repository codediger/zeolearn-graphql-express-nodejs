const { GraphQLObjectType, GraphQLList, GraphQLSchema } = require("graphql");

/*
    GraphQLSchema is used to create the schema of the app
    GraphQLList is a type wrapper around other types that represents a list of those types.
*/

const { MovieType, DirectorType } = require("./types"); // import our type definations
const dataSource = require("./data"); // import our data.

// This is the Root Query of the application
const RootQuery = new GraphQLObjectType({
  name: "MovieAppRootQuery",
  description: "Movie app root query",
  fields: () => ({
    directors: {
      type: new GraphQLList(DirectorType),
      description: "List of movie directors",
      resolve: () => dataSource.directors
    },
    movies: {
      type: new GraphQLList(MovieType),
      description: "List of movies",
      resolve: () => dataSource.movies
    }
  })
});

/* 
  The schema is created here using the GraphQLSchema instance
  and passed the root query
*/

const MovieApp = new GraphQLSchema({
  query: RootQuery
});

module.exports = MovieApp;
