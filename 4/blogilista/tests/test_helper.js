const Blog = require('../models/blog')

const initialBlogs = [
    {
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
      },
      {
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
      },
      {
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
      }
]

const blogToAdd = {
  title: "React patterns 2",
  author: "Michael Chan",
  url: "https://reactpatterns.com/",
  likes: 9,
}

const blogWithoutLikes = {
  title: "First class tests 2",
  author: "Robert C. Martin",
  url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions2.htmll",
}

const blogWithoutTitle = {
  author: "Robert C. Martin",
  url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions4.htmll",
  likes: 5
}

const blogWithoutURL = {
  title: "First class tests 3",
  author: "Robert C. Martin",
  likes: 2
}

const blogsInDatabase = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

module.exports = {
    initialBlogs,
    blogToAdd,
    blogWithoutLikes,
    blogWithoutTitle,
    blogWithoutURL,
    blogsInDatabase
}