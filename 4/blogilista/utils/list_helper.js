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
  
module.exports = {
    dummy, totalLikes
}