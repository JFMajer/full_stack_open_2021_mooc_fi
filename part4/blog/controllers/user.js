const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

usersRouter.get('/', async (request, response) => {
    const users = await User.find({})
    response.json(users)
})

usersRouter.post('/', async (request, response) => {
    const body = request.body
    if (body.password.length < 5) {
        return response.status(400).json({error: 'Password must be at least 5 characters long'})
    }
    const saltRounds = 12
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash 
    })
    const savedUser = await user.save()
    response.json(savedUser)

})

module.exports = usersRouter


