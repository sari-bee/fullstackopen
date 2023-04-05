const { blockStatement } = require("@babel/types")

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
            "title":blogs[0].title,
            "author":blogs[0].author,
            "likes":blogs[0].likes
        }
        return blog
    }
}
  
module.exports = {
    dummy, totalLikes, favoriteBlog
}