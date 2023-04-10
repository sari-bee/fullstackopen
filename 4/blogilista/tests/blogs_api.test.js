const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})

describe('for initial blogs', () => {
    test('they are returned as json', async () => {
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
})

describe('when posting a new entry', () => {
    test('the amount of blogs grows by one', async () => {
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
    
    test('the response to missing title is 400', async () => {
        await api.post('/api/blogs').send(helper.blogWithoutTitle).expect(400)
    })
    
    test('the response to missing url is 400', async () => {
        await api.post('/api/blogs').send(helper.blogWithoutURL).expect(400)
    })
})

describe('deleting an entry', () => {
    test('returns code 204 and number of blogs is reduced', async () => {
        const blogsAtStart = await helper.blogsInDatabase()
        const blogToDelete = blogsAtStart[0]
        await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)
        const blogsAtEnd = await helper.blogsInDatabase()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length-1)
    })
})

describe('updating an entry', () => {
    test('the number of likes in a blog can be increased by one', async () => {
        const allBlogs = await helper.blogsInDatabase()
        const blogToUpdate = allBlogs[0]
        const updatedBlog = {
            title: blogToUpdate.title,
            author: blogToUpdate.author,
            url: blogToUpdate.url,
            likes: blogToUpdate.likes+1,
        }
        await api.put(`/api/blogs/${blogToUpdate.id}`).send(updatedBlog)
        const allBlogsAtEnd = await helper.blogsInDatabase()
        expect(allBlogsAtEnd[0].likes).toEqual(blogToUpdate.likes+1)
    })
})

afterAll(async () => {
    await mongoose.connection.close()
})