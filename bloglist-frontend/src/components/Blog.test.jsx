import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from "@testing-library/react"
import Blog from "./Blog"
import { expect } from "vitest"

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

})
