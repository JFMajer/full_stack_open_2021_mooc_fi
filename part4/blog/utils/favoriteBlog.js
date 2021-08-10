
const favoriteBlog = (allBlogs) => {
    let mostLikes = 0
    let postToReturn = []
    allBlogs.map(post => {
        if (post.likes > mostLikes) {
            mostLikes = post.likes
            postToReturn = post
        }
    })
    return postToReturn
}


module.exports = {
    favoriteBlog
}