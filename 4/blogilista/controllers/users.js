const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')

userRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs', { title: 1, author: 1, url: 1, likes: 1 })
    response.json(users)
})

userRouter.post('/', async (request, response) => {
    const body = request.body
    if (body.password.length < 3) {
        response.status(400).json({ error : 'password too short' })
    } else {
        const saltRounds = 10
        const passwordHash = await bcrypt.hash(body.password, saltRounds)
        const user = new User({
            username: body.username,
            passwordHash: passwordHash,
            name: body.name
        })
        const savedUser = await user.save()
        response.status(201).json(savedUser)
    }
})

module.exports = userRouter