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

    type User {
    username: String!
    favoriteGenre: String!
    id: ID!
    }

    type Token {
    value: String!
    }

    type Subscription {
    bookAdded: Book!
    }

    type Query {
    bookCount: Int!
    authorCount: Int!
    allAuthors: [Author!]!
    allBooks(author: String, genre: String): [Book!]!
    findAuthor(name: String): Author!
    me: User
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
    createUser(
        username: String!
        favoriteGenre: String!
    ) : User
    login(
        username: String!
        password: String!
    ): Token
    }
`

module.exports = typeDefs