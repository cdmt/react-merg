const mongoose = require('mongoose');
require('dotenv').config({path: 'variables.env'});

const express = require('express');
const app = express();

const { ApolloServer } = require('apollo-server-express');
const {typeDefs} = require('./schema');
const {resolvers} = require('./resolvers');

const Font = require('./models/Font');

const PORT = process.env.PORT || 4000

const server = new ApolloServer({ 
    typeDefs, 
    resolvers,
    context:{
       Font
    }
});

server.applyMiddleware({ app });

mongoose    
    .connect(process.env.MONGO_URI,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    .then(() => console.log('bd connected'))
    .catch((err) => console.error(err))

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}        

app.listen({port: PORT})
    console.log(({url}) => console.log(`server listening on ${url}`))  
