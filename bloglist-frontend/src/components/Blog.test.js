import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import blogService from '../services/blogs'

test('Rendering Blog component', async () => {
  const blog = {
    author: 'John Snow',
    likes: 5,
    title: 'How to?',
    url: 'www.howto.com',
    id: '62eab5105e41b5c0fdfa9acf',
    user: {
      id: '62e9235e5e41b5c0fdfa9a41',
      name: 'John',
      username: 'johny',
    },
  }
  const user = {
    name: 'John',
    username: 'johny',
  }
  const mockFunction = jest.fn()
  render(
    <Blog
      blog={blog}
      user={user}
      updateBlogList={mockFunction}
      removeBlogFromList={mockFunction}
    />
  )

  const blogInfoElement = await screen.findByTestId('blog_info')
  const blogUrlElement = await screen.findByTestId('blog_url')
  const blogLikesElement = await screen.findByTestId('blog_likes')

  expect(blogInfoElement).toBeVisible()
  expect(blogInfoElement).toHaveTextContent(blog.title)
  expect(blogInfoElement).toHaveTextContent(blog.author)
  expect(blogUrlElement).not.toBeVisible()
  expect(blogLikesElement).not.toBeVisible()
})

test('Blog details become visible when View button is clicked', async () => {
  const blog = {
    author: 'John Snow',
    likes: 5,
    title: 'How to?',
    url: 'www.howto.com',
    id: '62eab5105e41b5c0fdfa9acf',
    user: {
      id: '62e9235e5e41b5c0fdfa9a41',
      name: 'John',
      username: 'johny',
    },
  }
  const user = {
    name: 'John',
    username: 'johny',
  }
  const mockFunction = jest.fn()
  render(
    <Blog
      blog={blog}
      user={user}
      updateBlogList={mockFunction}
      removeBlogFromList={mockFunction}
    />
  )
  const eventsUser = userEvent.setup()

  const viewButton = await screen.findByTestId('blog_details_view_button')
  await eventsUser.click(viewButton)
  const blogUrlElement = await screen.findByTestId('blog_url')
  const blogLikesElement = await screen.findByTestId('blog_likes')

  expect(blogUrlElement).toBeVisible()
  expect(blogLikesElement).toBeVisible()
})

test('Like button is clicked twice', async () => {
  const blog = {
    author: 'John Snow',
    likes: 5,
    title: 'How to?',
    url: 'www.howto.com',
    id: '62eab5105e41b5c0fdfa9acf',
    user: {
      id: '62e9235e5e41b5c0fdfa9a41',
      name: 'John',
      username: 'johny',
    },
  }
  const user = {
    name: 'John',
    username: 'johny',
  }

  const eventsUser = userEvent.setup()
  const mockFunction = jest.fn()
  const mockUpdateFunction = jest.fn()

  jest.spyOn(blogService, 'increaseLikes').mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(blog),
    })
  )
  render(
    <Blog
      blog={blog}
      user={user}
      updateBlogList={mockUpdateFunction}
      removeBlogFromList={mockFunction}
    />
  )
  const viewButton = await screen.findByTestId('blog_details_view_button')
  await eventsUser.click(viewButton)
  const likeButton = await screen.findByTestId('blog_like_button')
  await eventsUser.click(likeButton)
  await eventsUser.click(likeButton)

  expect(mockUpdateFunction.mock.calls.length).toBe(2)
})
