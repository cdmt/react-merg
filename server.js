const mongoose = require('mongoose');
require('dotenv').config({path: 'variables.env'});

const path = require('path');

const express = require('express');
const app = express();
const cors = require('cors');

const {ApolloServer} = require('apollo-server');
const {typeDefs} = require('./schema');
const {resolvers} = require('./resolvers');

const Font = require('./models/Font');

const PORT = process.env.PORT || 4000

app.use(express.static('public'));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

const server = new ApolloServer({
    typeDefs,
    resolvers,
    playground: process.env.NODE_ENV !== "production",
    context:{
        Font
    }
})

// server.applyMiddleware({
//     path: '/my-frontend', // you should change this to whatever you want
//     app,
//   });

mongoose    
    .connect(process.env.MONGO_URI,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    .then(() => console.log('bd connected'))
    .catch((err) => console.error(err))

server.listen({port: PORT})
    .then(({url}) => console.log(`server listening on ${url}`))    