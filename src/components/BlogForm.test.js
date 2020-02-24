import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

test('<BlogForm /> works correctly', () => {

  const createBlog = jest.fn()

  const component = render(
    <BlogForm createBlog={createBlog} />
  )

  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')
  const form = component.container.querySelector('form')



  fireEvent.change(title, {
    target: { value: 'Testing BlogForm' }
  })
  fireEvent.change(author, {
    target: { value: 'Testing Author' }
  })
  fireEvent.change(url, {
    target: { value: 'http://test' }
  })

  fireEvent.submit(form)

  expect(createBlog.mock.calls.length).toBe(1)
  expect(createBlog.mock.calls[0][0].title).toBe('Testing BlogForm')
  expect(createBlog.mock.calls[0][0].author).toBe('Testing Author')
  expect(createBlog.mock.calls[0][0].url).toBe('http://test')


})