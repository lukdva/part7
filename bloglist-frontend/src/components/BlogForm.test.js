import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'
import blogService from '../services/blogs'

test('SetBlogs prop receives correct data when new blog is created', async () => {
  const title = 'Test'
  const author = 'author'
  const url = 'google.com'
  const fillerFunction = () => {}
  const mockFunction = jest.fn()
  const eventsUser = userEvent.setup()
  const blogFormRef = { current: { toggleVisibility: fillerFunction } }

  const spy = jest.spyOn(blogService, 'createNew').mockImplementation(() => Promise.resolve(
    { title, author, url }
  ))

  render(<BlogForm blogs={[]} setBlogs={mockFunction} setMessage={fillerFunction} setIsError={(fillerFunction)} blogFormRef={blogFormRef}/>)
  const titleInput = await screen.findByTestId('title_input')
  const authorInput = await screen.findByTestId('author_input')
  const urlInput = await screen.findByTestId('url_input')
  const createButton = await screen.findByTestId('create_button')

  await eventsUser.type(titleInput, title)
  await eventsUser.type(authorInput, author)
  await eventsUser.type(urlInput, url)
  await eventsUser.click(createButton)

  screen.debug()
  console.log('OHO', mockFunction.mock.calls[0][0])
  expect(spy.mock.calls).toHaveLength(1)
  expect(spy.mock.calls[0][0]).toStrictEqual({ title, author, url })
  expect(mockFunction.mock.calls[0][0]).toStrictEqual([{ title, author, url }])
})