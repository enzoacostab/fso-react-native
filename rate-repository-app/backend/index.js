import { GraphQLError } from "graphql";
import jwt from "jsonwebtoken";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import "dotenv/config"
import { v1 as uuid } from "uuid";
import bcrypt from "bcrypt"
import mongoose from "mongoose";
import Review from "./models/Review.js";
import User from "./models/User.js";
import Repository from "./models/Repository.js";

mongoose.set("strictQuery", false)

const MONGODB_URI = process.env.MONGODB_URI

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDB")
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message)
  })

const typeDefs = `
  type AuthorizeInput {
    username: String!
    password: String!
  }

  type Token {
    token: String!
    username: String!
  }

  type User {
    _id: ID!
    username: String
    passwordHash: String!
    reviews: ReviewConnection
  }

  type Review {
    _id: ID!
    repositoryId: String!
    text: String!
    rating: Int!
    createdAt: String!
    user: User
  }
  
  type PageInfo {
    endCursor: String
    startCursor: String
    hasNextPage: Boolean
  }

  type Repository {
    id: String!
    fullName: String!
    description: String!
    language: String!
    forksCount: Int!
    stargazersCount: Int!
    ratingAverage: Int!
    reviewCount: Int!
    ownerAvatarUrl: String!
  }

  type GitHubRepository {
    id: String!
    fullName: String!
    url: String!
    reviews: ReviewConnection
  }

  type RepositoryEdge {
    node: Repository
    cursor: String
  }

  type ReviewEdge {
    node: Review
    cursor: String
  }

  type RepositoryConnection {
    edges: [RepositoryEdge] 
    pageInfo: PageInfo
  }

  type ReviewConnection  {
    edges: [ReviewEdge] 
    pageInfo: PageInfo
  }

  type Query {
    repositories(orderBy: String, orderDirection: String,
      searchKeyword: String, after: String, first: Int): RepositoryConnection
    repository(id: String, first: Int, after: String ): GitHubRepository!
    me: User
  }

  type Mutation {
    authorize(username: String!, password: String!): Token
    createReview(ownerName: String!, name: String!, rating: String!, review: String): Repository
    createUser(username: String!, password: String!): User!
    deleteReview(id: ID!): String
  }
`;

const resolvers = {
  Query: {
    repositories: async(root, args) => {
      let nodes = await Repository.find({})

      if (args.orderBy==="createdAt"){
        let revs = await Review.find({})
        const rid = []
        const firstReviews = []
        nodes.forEach(e => rid.push(e.id))

        for (let i=0;i<rid.length;i++){
          let r = revs.filter(e => e.repositoryId===rid[i])
          r.sort((a,b) => a.createdAt-b.createdAt)
          firstReviews.push(r[0])
        }

        firstReviews.sort((a,b) => b.createdAt-a.createdAt)
        nodes = firstReviews.map(e => nodes.find(f => f.id===e.repositoryId))

      }
      if (args.orderDirection==="asc" && args.orderBy==="ratingAverage"){
        nodes = nodes.sort((a,b) => a.ratingAverage - b.ratingAverage)
      }
      if (args.orderDirection==="desc" && args.orderBy==="ratingAverage"){
        nodes = nodes.sort((a,b) => b.ratingAverage - a.ratingAverage)
      }
      if (args.searchKeyword){
        nodes=nodes.filter(e => e.id.indexOf(args.searchKeyword)===0 || 
        e.fullName.indexOf(args.searchKeyword)===0)
      }
      let edges = null

      if (nodes){
        edges = nodes.map(e => {return {node: e, cursor: Buffer.from(JSON.stringify(e)).toString("base64")}})
        if (args.first) {
          let ind = args.after ? edges.findIndex(e => e.cursor === args.after) : 0
          edges = edges.slice(ind, ind+args.first)
        }
      }

      const res = {
        edges: edges,
        pageInfo: {
          endCursor: edges.at(-1)?.cursor,
          startCursor: edges[0]?.cursor,
          hasNextPage: true
        }
      }

      return res
    },
    
    repository: async(root, args) =>{
      const repository = await Repository.findOne({id: args.id})
      const revs = await Review.find({repositoryId: args.id}).populate('user')
      let edges = null
      if (revs){
        edges = revs.map(e => {
          const {__v, ...node} = e._doc
          node.createdAt = node.createdAt.toLocaleString().split(',')[0];
          return {
            node: node, cursor: Buffer.from(JSON.stringify(node)).toString("base64")
          }
        })

        if (args.first) {
          let ind = args.after ? edges.findIndex(e => e.cursor === args.after) : 0
          edges = edges.slice(ind, ind+args.first)
        }
      }

      const res = {
        fullName: repository.fullName,
        id: repository.id,
        url: `https://github.com/${repository.fullName}`,
        reviews: {
          edges: edges,
          pageInfo: {
            endCursor: edges.at(-1)?.cursor,
            startCursor: edges[0]?.cursor,
            hasNextPage: true
          }
        }
      }

      return res
    },

    me: async(root, args, {currentUser}) => {
      let revs
      try{
        revs = await Review.find({user:{_id: currentUser._id}})
      }
      catch{
        return null
      }
      
      let edges = []
      if (revs){
        edges = revs.map(e => {
          const {__v, ...node} = e._doc
          node.createdAt = node.createdAt.toLocaleString().split(',')[0];
          return {
            node: node, cursor: Buffer.from(JSON.stringify(node)).toString("base64")
          }
        })
        if (args.first) {
          let ind = args.after ? edges.findIndex(e => e.cursor === args.after) : 0
          edges = edges.slice(ind, ind+args.first)
        }
      }

      return {
        ...currentUser, 
        reviews: {
          edges: edges,
          pageInfo: {
            endCursor: edges.at(-1)?.cursor,
            startCursor: edges[0]?.cursor,
            hasNextPage: false
          } 
        }
      }
    }
  },
  Mutation: {
    authorize: async(root, args) => {
      let user = await User.findOne({username: args.username})
      let passwordCorrect = await bcrypt.compare(args.password, user.passwordHash)
      if (!user || !passwordCorrect ){
        throw new GraphQLError("Invalid username or password")
      }

      const userForToken = {
        username: args.username,
        _id: user.id
      }

      return {username: args.username, token: jwt.sign(userForToken, process.env.JWT_SECRET)}
    },

    createReview: async(root, args, {currentUser}) => {
      const repositoryId = `${args.ownerName}.${args.name}`
      const repository = await Repository.findOne({id: repositoryId})
      if (!repository){
        throw new GraphQLError("wrong inputs", {
          extensions: {
            code: "BAD_USER_INPUT"
          }
        })
      }

      const review = new Review({
        repositoryId: repositoryId,
        text: args.review || "",
        rating: Number(args.rating),
        createdAt: new Date().toJSON().split("T")[0],
        user: currentUser
      })

      review.save()
      return repository
    },

    createUser: async (root, args) => {
      const passwordHash = await bcrypt.hash(args.password, 10)
      const checkUsername = await User.findOne({username: args.username})

      if (args.username.length<3){
        throw new GraphQLError('username too short')
      }

      if (checkUsername){
        throw new GraphQLError('username already exist')
      }

      const user = new User({
        username: args.username,
        passwordHash
      })

      await user.save();

      return user
    },

    deleteReview: async(root, args) => {
      try{
        await Review.findByIdAndDelete(args.id)
      }
      catch(e){
        throw new GraphQLError(e)
      }

      return "review deleted"
    },
  }
}


const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  context: ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.startsWith("Bearer ")) {
      const decodedToken = jwt.verify(
        auth.substring(7), process.env.JWT_SECRET
      )
      const currentUser = decodedToken
      return { currentUser }
    }
  },
  listen: { port: 5000 },
});

console.log(`Server ready at: ${url}`);