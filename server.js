const mongoose = require('mongoose');
require('dotenv').config({path: 'variables.env'});

const {ApolloServer} = require('apollo-server');
const {typeDefs} = require('./schema');
const {resolvers} = require('./resolvers');

const Font = require('./models/Font');

const PORT = process.env.PORT || 4000

const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    context:{
        Font
    }
})

mongoose    
    .connect(process.env.MONGO_URI,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    .then(() => console.log('bd connected'))
    .catch((err) => console.error(err))

server.listen({port: PORT})
    .then(({url}) => console.log(`server listening on ${url}`))    