exports.resolvers = {

    Query:{
        fonts: async(obj, args, {Font}, info) => {
            const allFonts = await Font.find()
            return allFonts
        }
    }

}