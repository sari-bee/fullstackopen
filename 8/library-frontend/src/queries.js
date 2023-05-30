import { gql } from '@apollo/client'

export const EDIT_AUTHOR = gql`
mutation editAuthor($name: String!, $setBornTo: Int!){
  editAuthor(name: $name, setBornTo: $setBornTo) {
    name
    born
    bookCount
    id
  }
}
`

export const ADD_BOOK = gql`
mutation addBook($title: String!, $published: Int, $author: String!, $genres: [String]) {
  addBook(
    title: $title,
    published: $published,
    author: $author,
    genres: $genres
  ) {
    title
    published
    author {
      name
    }
    genres
    id
  }
}
`

export const ALL_AUTHORS = gql`
query {
  allAuthors {
    name
    born
    bookCount
  }
}
`

const BOOK_DETAILS = gql`
fragment BookDetails on Book {
  title
  author {
    name
  }
  published
  genres
}
`

export const ALL_BOOKS = gql`
query {
  allBooks { ...BookDetails }
}
${BOOK_DETAILS}
`

export const BOOKS_BY_GENRE = gql`
  query allBooks($genre: String!) {
    allBooks(genre: $genre) { ...BookDetails }
  }
  ${BOOK_DETAILS}
`

export const LOGIN = gql`
mutation login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    value
  }
}
`

export const ME = gql`
query {
  me {
    username
    favoriteGenre
  }
}`