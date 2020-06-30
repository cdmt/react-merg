const mongoose = require('mongoose');
require('dotenv').config({path: 'variables.env'});

const express = require('express');
const { ApolloServer } = require('apollo-server-express');

const {typeDefs} = require('./schema');
const {resolvers} = require('./resolvers');

const Font = require('./models/Font');

const PORT = process.env.PORT || 4000

mongoose    
    .connect(process.env.MONGO_URI,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    .then(() => console.log('bd connected'))
    .catch((err) => console.error(err))


const server = new ApolloServer({ 
    typeDefs, 
    resolvers,
    context:{
       Font
    }

});

const app = express();

server.applyMiddleware({ app });

app.listen({port: PORT})
    console.log(({url}) => console.log(`server listening on ${url}`))  




// const mongoose = require('mongoose');
// require('dotenv').config({path: 'variables.env'});

// const {ApolloServer} = require('apollo-server-express');
// const {typeDefs} = require('./schema');
// const {resolvers} = require('./resolvers');

// const Font = require('./models/Font');

// const path = require('path');

// const express = require('express');
// const app = express();
// const cors = require('cors');

// app.use(cors());

// const PORT = process.env.PORT || 4000

// app.use(express.static('public'));

// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
// });

// const server = new ApolloServer({
//     typeDefs,
//     resolvers,
//     playground: process.env.NODE_ENV !== "production",
//     context:{
//         Font
//     }
// })

// server.applyMiddleware({
//     path: '/my-frontend',
//     app,
//   });

// mongoose    
//     .connect(process.env.MONGO_URI,{
//         useNewUrlParser:true,
//         useUnifiedTopology:true
//     })
//     .then(() => console.log('bd connected'))
//     .catch((err) => console.error(err))

// app.listen({port: PORT})
//      console.log(({url}) => console.log(`server listening on ${url}`))    