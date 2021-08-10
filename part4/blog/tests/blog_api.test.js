const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')

beforeEach(async () => {
    await Blog.deleteMany({})
    console.log('cleared')

    const blogObjects = helper.initialBlogs
        .map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})

test('blogs are returned, should be 6', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(6)
})

test('unique identifier is id', async () => {
    const response = await api.get('/api/blogs')
    response.body.map(post => {
        console.log(post.id)
        expect(post.id.toBeDefined)
    })
})

test('post request adds post to DB', async () => {
    const newPost = new Blog({
        _id: "5a422a851b54a876234d17f7",
        title: "Hello world!",
        author: "Unknown",
        url: "www.google.com",
        likes: 13,
        __v: 0
    })
    await newPost.save()
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(7)
})

test('post blog without likes property and check if it equals to zero', async () => {
    const savedPost = await api
        .post('/api/blogs')
        .send({
            title: "Hello world123!",
            author: "Unknown",
            url: "www.google.com"
        })
        .expect(200)

    expect(savedPost.body.likes).toBe(0)
})

test('post blog without author and title, get 400', async () => {
    await api
        .post('/api/blogs')
        .send({
            url: "www.google.com"
        })
        .expect(400)
})


afterAll(() => {
    mongoose.connection.close()
})