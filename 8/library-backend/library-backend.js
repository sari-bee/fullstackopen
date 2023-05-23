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
    bookCount: async () => await Book.collection.countDocuments(),
    authorCount: async () => await Author.collection.countDocuments(),
    allAuthors: async () => { return await Author.find({}) },
    allBooks: async (root, args) => {
      if (args.author && args.genre) {
        const author = await Author.findOne({ name: args.author })
        return Book.find( {'genres': args.genre, author: author} )
      }
      if (args.author) {
        const author = await Author.findOne({ name: args.author })
        return Book.find({ author: author })
      }
      if (args.genre) {
        return Book.find( {'genres': args.genre} )
      }
      return await Book.find({})
    },
    findAuthor: async (root, args) => await Author.findOne({ name: args.name })
  },
  Author: {
    bookCount: async (root) => {
      const author = await Author.findOne({ name: root.name })
      const books = await Book.find({ author: author.id })
      return books.length
    },
  },
  Book: {
    author: async (root) => await Author.findById(root.author)
  },
  Mutation: {
      addBook: async (root, args) => {
        if (args.title.length < 5) {
          throw new GraphQLError('Title must be at least 5 characters', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.title
            }
          })
        }
        if (args.author.length < 4) {
          throw new GraphQLError('Author name must be at least 4 characters', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.author
            }
          })
        }
        if (!args.published) {
          throw new GraphQLError('Publishing year missing', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.published
            }
          })
        }
        const existingBook = await Book.findOne({ title: args.title })
        if (!existingBook) {
          let author = await Author.findOne({ name: args.author })
          if (!author) {
            author = new Author({ name: args.author })
            await author.save()
          }
          const book = new Book({ ...args, author: author })
          return book.save()
        } else {
          throw new GraphQLError('Title must be unique', {
              extensions: {
                code: 'BAD_USER_INPUT',
                invalidArgs: args.title
              }
            })
          }
      },
      editAuthor: async (root, args) => {
        const author = await Author.findOne({ name: args.name })
        if (!author) {
          throw new GraphQLError('Author not found', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.name
            }
          })
        }
        author.born = args.setBornTo
        return author.save()
      }
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