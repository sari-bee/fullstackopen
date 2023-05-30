const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
require('dotenv').config()
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const resolvers = {
    Query: {
      bookCount: async (root, args, context) => await Book.collection.countDocuments(),
      authorCount: async (root, args, context) => await Author.collection.countDocuments(),
      allAuthors: async (root, args, context) => { return await Author.find({}) },
      allBooks: async (root, args, context) => {
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
      findAuthor: async (root, args, context) => await Author.findOne({ name: args.name }),
      me: (root, args, context) => {
        return context.currentUser }
    },
    Author: {
      bookCount: async (root, args, context) => {
        const author = await Author.findOne({ name: root.name })
        const books = await Book.find({ author: author.id })
        return books.length
      },
    },
    Book: {
      author: async (root, args, context) => await Author.findById(root.author)
    },
    Mutation: {
        addBook: async (root, args, context) => {
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
          const currentUser = context.currentUser
          if (!currentUser) {
            throw new GraphQLError('Not authenticated', {
              extensions: {
                code: 'BAD_USER_INPUT'
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
            pubsub.publish('BOOK_ADDED', { bookAdded: book })
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
        editAuthor: async (root, args, context) => {
          const currentUser = context.currentUser
          if (!currentUser) {
            throw new GraphQLError('Not authenticated', {
              extensions: {
                code: 'BAD_USER_INPUT'
              }
            })
          }
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
          .catch(error => {
            throw new GraphQLError('Editing author failed', {
              extensions: {
                code: 'BAD_USER_INPUT',
                invalidArgs: args.setBornTo,
                error
              }
            })
          })
        },
        createUser: async (root, args, context) => {
          const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })
          return user.save()
          .catch(error => {
            throw new GraphQLError('Creating user failed', {
              extensions: {
                code: 'BAD_USER_INPUT',
                error
              }
            })
          })
        },
        login: async (root, args, context) => {
          const user = await User.findOne({ username: args.username })
          if (!user || args.password !== 'secret') {
            throw new GraphQLError('wrong credentials', {
              extensions: {
                code: 'BAD_USER_INPUT'
              }
            })
          }
          const userForToken = {
            username: user.username,
            id: user._id,
          }
  
          return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
        },
    },
    Subscription: {
        bookAdded: {
            subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
        },
    },
  }

module.exports = resolvers