import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from "@testing-library/react"
import userEvent from '@testing-library/user-event'
import Blog from "./Blog"

test('renders blog title and author', ()=>{

    const blog = {
        title: 'Testing Blog Title',
        author: "Testing Blog Author",
        url: "blog.url",
        user: "1",
        id: "blog.id",
        likes: 0
    }

    render(<Blog blog={blog}/>)
    const blogElement = screen.getByText('Testing Blog Title : Testing Blog Author')
    expect(blogElement).toBeDefined();

    const { container } = render(<Blog blog={blog}/>)
    const div = container.querySelector('.blogPost')
    expect(div).toHaveTextContent('Testing Blog Title : Testing Blog Author')

});

test('renders likes and url is rendered when show button is pressed',async ()=>{

    const blog = {
        title: 'Testing Blog Title',
        author: "Testing Blog Author",
        url: "blog.url",
        user: "1",
        id: "blog.id",
        likes: 0
    }

    const { container } = render(<Blog blog={blog}/>)
    
    const user = userEvent.setup()
    const view = screen.getByText('view')
    await user.click(view)

    const div = container.querySelector('.urlView')
    expect(div).not.toHaveStyle('display: none')
    const div1 = container.querySelector('.likesView')
    expect(div1).not.toHaveStyle('display: none')

})

test('When like button is pressed, function is called twice',async ()=>{

    const blog = {
        title: 'Testing Blog Title',
        author: "Testing Blog Author",
        url: "blog.url",
        user: "1",
        id: "blog.id",
        likes: 0
    }
    
    const user = userEvent.setup()
    const mockHandler = vi.fn()

    const { container } = render(<Blog blog={blog} likeBlogPost={mockHandler}/>)
    const view = screen.getByText('view')
    await user.click(view)

    const div = container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')

    const likeButton = screen.getByText('Likes')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)

})


