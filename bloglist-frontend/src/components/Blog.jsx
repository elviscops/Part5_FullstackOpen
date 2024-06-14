import { useState, useRef } from 'react'
import Togglable from '../components/Togglable'

const Blog = ({ blog , likeBlogPost, deleteBlogPost, username }) => {
    const [blogLikes,setBlogLikes] = useState(blog.likes)
    const blogPostRef = useRef()

    const tmpBlog = {
        title: blog.title,
        author: blog.author,
        url: blog.url,
        user: blog.user.id,
        id: blog.id,
        likes: blogLikes+1,
    }

    const likeBlog = () => {
        setBlogLikes(blogLikes+1)
        likeBlogPost(tmpBlog)
    }

    const deleteBlog = (id) => {
        if (window.confirm(`Delete blog ${blog.title} by "${blog.author}`)){
            deleteBlogPost(id)
        }
    }

    return (
        <div className="blogPost">
            <div>
            {blog.title} : {blog.author}
            <Togglable buttonLabel="view" ref={blogPostRef}>
                <div className='togglableContent'>
                    <div className='urlView'>URL: {blog.url}</div>
                    <div className='likesView'>Likes: {blog.likes}<button onClick={likeBlog}>Likes</button></div>
                    <div>User: {blog.user.username}</div>
                    {blog.user.username === username && (<button onClick={() => deleteBlog(blog.id)}>remove</button>)}
                </div>
            </Togglable>
            </div>
        </div> )
}

export default Blog
    