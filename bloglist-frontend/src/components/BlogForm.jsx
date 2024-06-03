import { useState } from 'react'

const BlogForm = ({createNewBlog}) => {
    const [title, setTitle] = useState([])
    const [author, setAuthor] = useState([])
    const [blogURL, setBlogURL] = useState([])

    const handleAddBlog = async (event) => {
        event.preventDefault()
        createNewBlog({
            title:title,
            author:author,
            url:blogURL
        })
        setTitle('')
        setAuthor('')
        setBlogURL('')
    }

    return (
    <div>
        <h2>Add new Blog</h2>
        <form onSubmit={handleAddBlog}>
            <div>
                Title: <input type='text' value={title} onChange={(event)=>setTitle(event.target.value)}/>
            </div>
            <div>
                Author: <input type='text' value={author} onChange={(event)=>setAuthor(event.target.value)}/>
            </div>
            <div>
                Link: <input type='text' value={blogURL} onChange={(event)=>setBlogURL(event.target.value)}/>
            </div>
            <button type="submit">Add</button>
        </form>
    </div>)
}
  
  export default BlogForm