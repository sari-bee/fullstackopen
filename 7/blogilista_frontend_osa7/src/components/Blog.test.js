import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const blog = {
  title: 'This is how we test components',
  author: 'Tester',
  url: 'www.react.com',
  likes: 1,
  user: {
    name: 'akuankka',
  },
}

test('renders blog title and author', () => {
  const { container } = render(<Blog blog={blog} />)
  const div = container.querySelector('.visibleContent')
  expect(div).toHaveTextContent('Tester')
  expect(div).toHaveTextContent('This is how we test components')
})

test('at start hidden content such as url is not displayed', () => {
  const { container } = render(<Blog blog={blog} />)
  const div = container.querySelector('.hiddenContent')
  expect(div).toHaveStyle('display: none')
})

test('after opening hidden content is displayed', async () => {
  const { container } = render(<Blog blog={blog} />)
  const div = container.querySelector('.hiddenContent')
  expect(div).toHaveStyle('display: none')
  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)
  expect(div).toHaveStyle('display: block')
})

test('if like button clicked twice event handler called twice', async () => {
  const mockHandler = jest.fn()
  render(<Blog blog={blog} addLike={mockHandler} />)
  const user = userEvent.setup()
  const viewButton = screen.getByText('view')
  await user.click(viewButton)
  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)
  expect(mockHandler.mock.calls).toHaveLength(2)
})
