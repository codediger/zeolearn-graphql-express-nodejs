const express = require("express"); // import express
const graphqlHTTP = require("express-graphql"); // import the express-graphql middleware
const schema = require("./src/schema.js"); // import the schema defination

const PORT = process.env.PORT || 3000; // define port
const app = express(); // create an instance of express

app.use(
  "/graphql", // define the API route
  graphqlHTTP({
    // graphql server configs
    schema: schema,
    graphiql: true //set to false if you don't want graphiql(playground) enabled
  })
);

app.listen(PORT); // port the server should listen on
console.log(
  `Movie App GraphQL server running at localhost:${PORT}/graphql`
);
