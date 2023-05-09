import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AddBlogForm from './AddBlogForm'

const blog = {
  title: 'This is how we test components',
  author: 'Tester',
  url: 'www.react.com',
}

test('event handler called with right information when new blog created', async () => {
  const mockHandler = jest.fn()
  const user = userEvent.setup()
  const { container } = render(<AddBlogForm createBlog={mockHandler} />)
  const titleField = container.querySelector('#title-input')
  await user.type(titleField, blog.title)
  const authorField = container.querySelector('#author-input')
  await user.type(authorField, blog.author)
  const urlField = container.querySelector('#url-input')
  await user.type(urlField, blog.url)
  const createButton = container.querySelector('#submit-button')
  await user.click(createButton)
  expect(mockHandler.mock.calls[0][0].title).toBe(blog.title)
  expect(mockHandler.mock.calls[0][0].author).toBe(blog.author)
  expect(mockHandler.mock.calls[0][0].url).toBe(blog.url)
})
