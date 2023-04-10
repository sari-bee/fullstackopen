const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')

beforeEach(async () => {
    await User.deleteMany({})
    let passwordHash = await bcrypt.hash('keijonsalasana', 10)
    let user = new User({ username: 'keijo', name: 'Keijo Käyttäjä', passwordHash })
    await user.save()
    passwordHash = await bcrypt.hash('saaransalasana', 10)
    user = new User({ username: 'saara', name: 'Saara Salattu', passwordHash })
    await user.save()
})

describe('for one initial user', () => {

    test('it is returned as json', async () => {
        await api.get('/api/users')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })
    
    test('there is the right amount of users', async () => {
        const response = await api.get('/api/users')
        expect(response.body).toHaveLength(2)
    })

})

describe('when adding a new user', () => {

    test('the amount of users grows by one', async () => {
        const usersAtStart = await helper.usersInDatabase()

        const userToAdd = {
            name: "Laura Lisätty",
            username: "laura",
            password: "lauransalasana",
        }    

        await api.post('/api/users').send(userToAdd)
        const usersAtEnd = await helper.usersInDatabase()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
    })
    
})

afterAll(async () => {
    await mongoose.connection.close()
})