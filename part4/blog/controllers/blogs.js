const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const tokenExtractor = require('../utils/middleware').tokenExtractor
const userExtractor = require('../utils/middleware').userExtractor

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogRouter.post('/', tokenExtractor, userExtractor, async (request, response) => {
  const body = request.body
  const user = request.user

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id
  })
  
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.json(savedBlog)
})

blogRouter.put('/:id', async (request, response) => {
  const { id } = request.params
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    likes: body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(id, blog, { new: true, runValidators: true })
  //console.log(updatedBlog)
  response.json(updatedBlog)
})

blogRouter.delete('/:id', tokenExtractor, userExtractor, async (request, response) => {
  const user = request.user
  const blogToRemove = await Blog.findById(request.params.id)
  if (!(blogToRemove.user.toString() === user.id)) {
    return response.status(403).json({error: 'non authorized'})
  }
  await User.findByIdAndUpdate(user.id, { $pull: {blogs : blogToRemove.id} })
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})


module.exports = blogRouter