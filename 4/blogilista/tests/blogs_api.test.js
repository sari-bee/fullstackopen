const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})

test('blogs returned as json', async () => {
    await api.get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('there is the right amount of blogs', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('there is a field called id', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
})

test('when posting the amount of blogs grows by one', async () => {
    await api.post('/api/blogs').send(helper.blogToAdd)
    const blogsAtEnd = await helper.blogsInDatabase()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
})

test('the default value for likes is zero', async () => {
    await Blog.deleteMany({})
    await api.post('/api/blogs').send(helper.blogWithoutLikes)
    const blogsAtEnd = await helper.blogsInDatabase()
    expect(blogsAtEnd[0].likes).toEqual(0)
})

test('response to missing title is 400', async () => {
    await api.post('/api/blogs').send(helper.blogWithoutTitle).expect(400)
})

test('response to missing url is 400', async () => {
    await api.post('/api/blogs').send(helper.blogWithoutURL).expect(400)
})

afterAll(async () => {
    await mongoose.connection.close()
})