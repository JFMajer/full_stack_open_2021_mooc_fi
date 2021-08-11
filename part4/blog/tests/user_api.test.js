const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')

beforeEach(async () => {
    await User.deleteMany({})
    console.log('cleared')
})

test('user is not created if password is too short', async() => {
    
    await api
        .post('/api/users')
        .send({
            username: "TestUser",
            name: "User",
            password: "test"
        })
        .expect(400)
})

test('user is not created if username is too short', async() => {
    
    await api
        .post('/api/users')
        .send({
            username: "Te",
            name: "User",
            password: "test343242"
        })
        .expect(400)
})


afterAll(() => {
    mongoose.connection.close()
})