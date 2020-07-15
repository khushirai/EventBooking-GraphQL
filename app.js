const express = require("express");
const bodyParser = require("body-parser");
// take incoming req and parse into the graphql query
// and forward them to right resolver
// require('express-graphql') returns an object with a property called graphqlHTTP that is the function you want to call.
// You're trying to call the object itself as if it was a function.
const graphqlHttp = require("express-graphql").graphqlHTTP;
// takes the string and that string should define our schmea
const { buildSchema } = require("graphql");
const mongoose = require("mongoose");

const graphQLSchema=require('./graphql/schema/index');
const graphQLResolvers=require('./graphql/resolvers/index');
const isAuth=require('./middleware/is-auth')

const app = express();

app.use(bodyParser.json());

// as a middleware
app.use(isAuth);

app.use('/graphql',graphqlHttp({
    schema:graphQLSchema,
    // bundle of all the resolvers
    rootValue:graphQLResolvers,
    graphiql:true
}))


mongoose
    .connect(
        `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.ybdp8.mongodb.net/${process.env.MONGO_DB}?retryWrites=true
    `
    )
    .then(() => {
        app.listen(3000);
    })
    .catch((err) => {
        console.log(err);
    });

// express-graphql acts as a middleware in express node js applications
// nd allows to point to schema, resolvers and automatically connect all of those

// graphql allows to define our schema

// this all pagination is done by graphql packages
// that helps to return only the particular parameter user asks for
