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

const Blog = ({ blog }) => (
  <div className="blogPost">
    <div>
    {blog.title} : {blog.author}  
    <Togglable buttonLabel="view">
        <div>URL: {blog.url}</div>
        <div>Likes: {blog.likes}<button onClick={()=>console.log(blog.title)}>Likes</button></div>
        <div>User: {blog.user[0].username}</div>
    </Togglable>
    </div>
  </div>  
)

export default Blog

//<button onClick={()=>console.log(blog.title)}>view</button>