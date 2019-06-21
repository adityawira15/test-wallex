const graphql = require('graphql')

const { GraphQLObjectType, GraphQLBoolean, GraphQLString } = graphql

const AuthType = new GraphQLObjectType({
  name: 'Auth',
  fields: () => ({
    login: { type: GraphQLBoolean },
    message: { type: GraphQLString }
  })
})

module.exports = AuthType