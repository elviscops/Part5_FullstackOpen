import { useState, useEffect } from 'react'

const Togglable = (props) => {
    const [visible, setVisible] = useState(false)
    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }
    const toggleVisibility = () => setVisible(!visible)
    return ( 
        <>
            <button className = "viewHideButton" style={hideWhenVisible} onClick={toggleVisibility}>{props.buttonLabel}</button>
            <button className = "viewHideButton" style={showWhenVisible} onClick={toggleVisibility}>Hide</button>
            <div style={showWhenVisible}>{props.children}</div>
        </>
    )
}



const Blog = ({ blog , likeBlogPost, deleteBlogPost, username}) => {
    const [blogLikes,setBlogLikes] = useState(blog.likes);

    const tmpBlog = {
        title: blog.title,
        author: blog.author,
        url: blog.url,
        user: blog.user.id,
        id: blog.id,
        likes: blogLikes+1,
    };

    const likeBlog = () =>{
        setBlogLikes(blogLikes+1);
        likeBlogPost(tmpBlog);
    }

    const deleteBlog = (id) =>{
        if (window.confirm(`Delete blog ${blog.title} by "${blog.author}`)){
            deleteBlogPost(id);
        }
    }

    return (
        <div className="blogPost">
            <div>
            {blog.title} : {blog.author}  
            <Togglable buttonLabel="view">
                <div>URL: {blog.url}</div>
                <div>Likes: {blog.likes}<button onClick={likeBlog}>Likes</button></div>
                <div>User: {blog.user.username}</div>
                {blog.user.username === username && (<button onClick={()=>deleteBlog(blog.id)}>remove</button>)}
            </Togglable>
            </div>
        </div> ); 
}

export default Blog
