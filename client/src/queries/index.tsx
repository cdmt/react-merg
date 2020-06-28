import {gql} from 'apollo-boost';

export const GET_ALL_FONTS = gql `
    query FontData{
        fonts{
            _id
            name
            description
        }
    }
`