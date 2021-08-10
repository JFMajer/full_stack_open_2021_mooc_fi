
const totalLikes = (allPosts) => {
    let likes = 0
    //console.log(allPosts)
    allPosts.map(post => {
        likes += post.likes
    })
    return likes
}

module.exports = {
    totalLikes
}