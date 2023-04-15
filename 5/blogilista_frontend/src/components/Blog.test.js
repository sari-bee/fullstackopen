import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

const blog = {
  title: 'This is how we test components',
  author: 'Tester',
  url: 'www.react.com',
  likes: 1,
  user: {
    name: 'akuankka',
  }
}

test('renders blog title', () => {
  const { container } = render(<Blog blog={blog} />)
  const div = container.querySelector('.visibleContent')
  expect(div).toHaveTextContent('This is how we test components')
})

test('at start hidden content such as url is not displayed', () => {
  const { container } = render(<Blog blog={blog} />)
  const div = container.querySelector('.hiddenContent')
  expect(div).toHaveStyle('display: none')
})