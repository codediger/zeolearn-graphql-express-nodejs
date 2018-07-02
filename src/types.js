const { GraphQLString, GraphQLObjectType, GraphQLNonNull } = require("graphql");

/* 
  GraphQLString is a basic GraphQL type; A scalar type representing strings.
  GraphQLObjectType is an object type within GraphQL that contains fields.
  GraphQLNonNull is a type wrapper around other types that enforce that their values are never null
*/

const dataSource = require("./data");

const DirectorType = new GraphQLObjectType({
  name: "Director",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    movies: {
      type: MovieType,
      resolve: director =>
        dataSource.movies.find(i => i.director_id === director.id)
    }
  })
});

const MovieType = new GraphQLObjectType({
  name: "Movie",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLString) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    plot: { type: GraphQLString },
    runtime: { type: GraphQLString },
    rated: { type: GraphQLString },
    year: { type: GraphQLString },
    released: { type: GraphQLString },
    language: { type: GraphQLString },
    director: {
      type: DirectorType,
      resolve: movie =>
        dataSource.directors.find(i => i.id === movie.director_id)
    }
  })
});

module.exports = { DirectorType, MovieType };
