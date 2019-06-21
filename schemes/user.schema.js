const graphql = require('graphql')

const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    birthOfDate: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    message: { type: GraphQLString }
  })
})

module.exports = UserType