const lodash = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const likes = blogs.map(b => b.likes)
    if (likes.length === 0) {
        return 0
    } else {
        const reducer = (sum, item) => {
            return sum + item
        }
        return likes.reduce(reducer, 0)
    }
}

const favoriteBlog = (blogs) => {
    blogs.sort((a, b) => {
        return b.likes - a.likes
    })
    if (blogs.length === 0) {
        return null
    } else {
        const blog = {
            'title':blogs[0].title,
            'author':blogs[0].author,
            'likes':blogs[0].likes
        }
        return blog
    }
}

const mostBlogs = (blogs) => {
    const authors = blogs.map(b => b.author)
    const uniqueAuthors = lodash.countBy(authors)
    const pairs = lodash.toPairs(uniqueAuthors)
    pairs.sort((a, b) => {
        return b[1] - a[1]
    })
    if (authors.length === 0) {
        return null
    } else {
        const author = {
            'author':pairs[0][0],
            'blogs':pairs[0][1]
        }
        return author
    }
}
  
module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs
}