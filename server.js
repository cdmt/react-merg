const mongoose = require('mongoose');
require('dotenv').config({path: 'variables.env'});

const express = require('express');
const { ApolloServer } = require('apollo-server-express');

const {typeDefs} = require('./schema');
const {resolvers} = require('./resolvers');

const Font = require('./models/Font');

const PORT = process.env.PORT || 4000

const app = express();

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
    // Exprees will serve up production assets
    app.use(express.static('client/build'));
    
    // Express serve up index.html file if it doesn't recognize route
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}        

app.listen({port: PORT})
    console.log(({url}) => console.log(`server listening on ${url}`))  
