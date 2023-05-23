const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { GraphQLError } = require('graphql')
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const Book = require('./models/book')
const Author = require('./models/author')
require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI
mongoose.connect(MONGODB_URI)

const typeDefs = `
  type Author {
    name: String!
    born: Int
    id: ID!
    bookCount: Int
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allAuthors: [Author!]!
    allBooks(author: String, genre: String): [Book!]!
    findAuthor(name: String): Author!
  }

  type Mutation {
    addBook(
      title: String!
      published: Int
      author: String!
      genres: [String]
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }
`

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allAuthors: async () => { return Author.find({}) },
    allBooks: async (root, args) => {
//      if (args.author && args.genre) {
//          return books.filter(b => (b.author === args.author && b.genres.includes(args.genre)))
//      }
//      if (args.author) {
//        return books.filter(b => b.author === args.author)
//      }
//      if (args.genre) {
//        return books.filter(b => b.genres.includes(args.genre))
//      }
      return await Book.find({})
    },
    findAuthor: async (root, args) => Author.findOne({ name: args.name }),
  },
//  Author: {
//    bookCount: (root) => books.filter(b => b.author === root.name).length
//  },
  Mutation: {
      addBook: async (root, args) => {
//        if (books.find(b => b.title === args.title)) {
//          throw new GraphQLError('Title must be unique', {
//            extensions: {
//              code: 'BAD_USER_INPUT',
//              invalidArgs: args.title
//            }
//          })
//        }
        let author = await Author.findOne({ name: args.author })
        if (!author) {
          author = new Author({ name: args.author })
          await author.save()
        }
        const book = new Book({ ...args, author: author })
        return book.save()
      },
//      editAuthor: (root, args) => {
//        const author = authors.find(a => a.name === args.name)
//        if (!author) {
//            return null
//        }
//        const updatedAuthor = { ...author, born: args.setBornTo }
//        authors = authors.map(a => a.name === args.name ? updatedAuthor : a)
//        return updatedAuthor
//      }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})