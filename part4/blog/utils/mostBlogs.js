
const mostBlogs = (allBlogs) => {
    let helperArray = []
    allBlogs.map(blog => {
        helperArray.map(numOfBlogs => {
            if (blog.author === numOfBlogs.author) {
                numOfBlogs.blogs += 1
            }
        })
    })
}