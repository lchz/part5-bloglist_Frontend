import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('renders title and author but not url or likes', () => {
  const user = {
    username: 'test',
    name: 'Test User',
    password: 'test'
  }
  const blog = {
    title: 'Testing rendering step 1',
    author: 'Testing Author',
    url: 'http://test',
    user: { user }
  }

  const component = render(
    <Blog blog={blog} />
  )

  expect(component.container).toHaveTextContent(
    'Testing rendering step 1'
  )

  expect(component.container).toHaveTextContent(
    'Testing Author'
  )

  expect(component.container).not.toHaveTextContent('likes')
  expect(component.container).not.toHaveTextContent('http')
})

test('url and likes show when view button clicked', () => {
  const user = {
    username: 'test',
    name: 'Test User',
    password: 'test'
  }
  const blog = {
    title: 'Testing rendering step 1',
    author: 'Testing Author',
    url: 'http://test',
    user: { user }
  }

  const component = render(
    <Blog blog={blog} />
  )

  const button = component.getByText('view')
  fireEvent.click(button)

  expect(component.container).toHaveTextContent('likes')
  expect(component.container).toHaveTextContent('http://test')
})

test('like button works correctly', () => {
  const user = {
    username: 'test',
    name: 'Test User',
    password: 'test'
  }
  const blog = {
    title: 'Testing rendering step 1',
    author: 'Testing Author',
    url: 'http://test',
    user: { user }
  }

  const mockLikeHandler = jest.fn()

  const component = render(
    <Blog blog={blog} updateLikes={mockLikeHandler} />
  )

  const button = component.getByText('view')
  fireEvent.click(button)

  const likeButton = component.getByText('like')
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)
  
  expect(mockLikeHandler.mock.calls.length).toBe(2)
})
