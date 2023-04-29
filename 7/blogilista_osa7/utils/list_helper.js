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
    const authors = lodash.countBy(blogs.map(b => b.author))
    const pairs = lodash.toPairs(authors)
    pairs.sort((a, b) => {
        return b[1] - a[1]
    })

    if (blogs.length === 0) {
        return null
    } else {
        const author = {
            'author':pairs[0][0],
            'blogs':pairs[0][1]
        }
        return author
    }
}

const mostLikes = (blogs) => {
    const sortByAuthors = lodash.groupBy(blogs, b => b.author)
    const likesByAuthor = Object.values(sortByAuthors).map(a => {
        const likes = a.reduce((sum, blog) => {
            return sum + blog.likes
        }, 0)
        return {author: a[0].author, likes: likes}
    })
    likesByAuthor.sort((a, b) => {
        return b.likes - a.likes
    })

    if (blogs.length === 0) {
        return null
    } else {
        return likesByAuthor[0]
    }
}
  
module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}