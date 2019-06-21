const graphql = require('graphql')
const _ = require('lodash')
const bcrypt = require('bcrypt')
const UserType = require('../schemes/user.schema')
const AuthType = require('../schemes/auth.schema')
const User = require('../models/user.model')

const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLSchema,
  GraphQLString,
  GraphQLList,
  GraphQLID,
} = graphql

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parent, args){
        return User.findById(args.id)
      }
    },
    users: {
      type: new GraphQLList(UserType),
      resolve() {
        return User.find({})
      }
    },
    login: {
      type: AuthType,
      args: { 
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) }
      },
      async resolve(parent, args) {
        let user = await User.findOne({ email: args.email })
        if (!user) {
          throw new Error('Invalid email password!')
        } else {
          if (bcrypt.compareSync(args.password, user.password)) {
            return {
              login: true,
              message: 'Success Login!'
            }
          } else {
            throw new Error('Invalid email password!')
          }
        }
      }
    }
  }
})

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addUser: {
      type: UserType,
      args: { 
        firstName: { type: new GraphQLNonNull(GraphQLString) },
        lastName: { type: GraphQLString },
        birthOfDate: { type: GraphQLString },
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) }
       },
      async resolve(parent, args){
        let data = args
        let password = bcrypt.hashSync(data.password, 10)
        data.password = password
        let user = new User(data)
        await user.save((err) => { if (err) throw new Error(err.message) })
        return { message: "User Created!" }
      }
    },
    editUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        birthOfDate: { type: GraphQLString },
        email: { type: GraphQLString },
        oldPassword: { type: GraphQLString },
        newPassword: { type: GraphQLString }
      },
      async resolve(parent, args) {
        let user = await User.findById(args.id)
        if (args.email) {
          let getEmail = await User.findOne({ email: args.email })
          if (getEmail) {
            throw new Error('Email already taken!')
          }
        }
        if (args.oldPassword) {
          if (!args.newPassword) {
            throw new Error('New Password is Required!')
          } else {
            if (bcrypt.compareSync(args.oldPassword, user.password)) {
              await user.update({ password: bcrypt.hashSync(args.newPassword, 10) })
            } else {
              throw new Error('Password Wrong!')
            }
          }
        }
        await user.update(args, (err) => {
          if (err) throw new Error(err.message)
        })
        return User.findById(user._id)
      }
    },
    deleteUser: {
      type: UserType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      async resolve(parent, args) {
        let user = await User.findById(args.id)
        if (!user) {
          throw new Error(`user with id ${args.id} not found!`)
        }
        await user.remove((err) => { if (err) throw new Error('Delete Failed!') })
        return { message: `User with id ${args.id} is Deleted!` }
      }
    }
  }
})

module.exports = new GraphQLSchema({ query: RootQuery, mutation: Mutation })