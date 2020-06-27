exports.typeDefs = `

    type Font{
        _id: String
        name: String
        description: String
    }

    type Query{
        fonts: [Font]
    }

`