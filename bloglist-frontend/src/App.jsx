import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'


const LoginForm = (props) => {
    return (
    <div>
        <h2>Login</h2>
        <form onSubmit={props.handleLogin}>
            <div>
                Username <input type='text' value={props.username} onChange={props.handleUsernameChange}/>
            </div>
            <div>
                Password <input type='password' value={props.password} onChange={props.handlePasswordChange}/>
            </div>
            <button type="submit">Login</button>
        </form>
    </div>)
}

const BlogForm = (props) => {
    return (
    <div>
        <h2>Add new Blog</h2>
        <form onSubmit={props.handleAddBlog}>
            <div>
                Title: <input type='text' value={props.title} onChange={props.handleTitleChange}/>
            </div>
            <div>
                Author: <input type='text' value={props.author} onChange={props.handleAuthorChange}/>
            </div>
            <div>
                Link: <input type='text' value={props.blogURL} onChange={props.handleBlogURLChange}/>
            </div>
            <button type="submit">Add</button>
        </form>
    </div>)
}

const Notification = (props) => {
    console.log(props.message)
    return <div>{props.message}</div>
}



const App = () => {
    const [blogs, setBlogs] = useState([])

    const [username, setUsername] = useState([])
    const [password, setPassword] = useState([])

    const [title, setTitle] = useState([])
    const [author, setAuthor] = useState([])
    const [blogURL, setBlogURL] = useState([])
    const [user, setUser] = useState(null)

    
    const [message, setMessage] = useState(null)

    

    

    useEffect(() => {

        blogService.getAll().then(blogs =>
        setBlogs( blogs )
        )  
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedInUser')
        if (loggedUserJSON) {
          const user = JSON.parse(loggedUserJSON)
          console.log(user.token)
          setUser(user)
        }
      }, [])

    const handleLogin = async (event) => {
        event.preventDefault()
        console.log('logging in with', username, password)
    
        try {
            const user = await loginService.login({
                username,password
            })

            window.localStorage.setItem(
                'loggedInUser', JSON.stringify(user)
            ) 
            console.log(user, window.localStorage.getItem('loggedInUser'))

            setUser(user)
            blogService.setToken(user.token)
            setUsername('')
            setPassword('')
        } catch (exception) {
            console.log(exception)
            setTimeout(()=>{
                console.log()
            },5000)
        }
      }

    const handleLogOut = async (event) => {
        console.log("Logout")
        window.localStorage.removeItem('loggedNoteappUser')
        window.localStorage.clear()
    }
      

      const handleAddBlog = async (event) => {
        event.preventDefault()
        blogService.setToken(user.token)
        const newBlog = {
            title:title,
            author:author,
            url:blogURL
        }
    
        try {
            const blog = await blogService.create(newBlog)
            console.log("creating blog",blog)
            setBlogs(blogs.concat(blog))
            setTitle('')
            setAuthor('')
            setBlogURL('')

        } catch (exception) {
            console.log(exception)
            setTimeout(()=>{
                console.log()
            },5000)
        }



      }

    const handleUsernameChange = (event) => {
        event.preventDefault()
        console.log(event.target.value);
        setUsername(event.target.value);
    }
    
    const handlePasswordChange = (event) => {
        event.preventDefault()
        console.log(event.target.value);
        setPassword(event.target.value);
    }    

    const handleTitleChange = (event) => {
        event.preventDefault()
        console.log(event.target.value);
        setTitle(event.target.value);
    }
    
    const handleAuthorChange = (event) => {
        event.preventDefault()
        console.log(event.target.value);
        setAuthor(event.target.value);
    }    

    const handleBlogURLChange = (event) => {
        event.preventDefault()
        console.log(event.target.value);
        setBlogURL(event.target.value);
    }    

    return (
        <div>
            <h1>Blogs List Page</h1>

            {  user === null &&
                <LoginForm 
                        username={username} 
                        password={password} 
                        handleLogin={handleLogin}
                        handleUsernameChange={handleUsernameChange}
                        handlePasswordChange={handlePasswordChange}
            /> }

            {  user !== null && 
            <div>
                <div><Notification message={(user.username+" has been logged in: ")} />
                    <div>
                        <form onSubmit={handleLogOut}>
                            <button type="submit">Log Out</button>
                        </form>
                    </div>
                </div>
                <div>
                    <BlogForm 
                    title={title} 
                    author={author} 
                    blogURL={blogURL} 
                    handleAddBlog={handleAddBlog}
                    handleTitleChange={handleTitleChange}
                    handleAuthorChange={handleAuthorChange}
                    handleBlogURLChange={handleBlogURLChange}
                    />   
                    <br></br>
                </div>
                <div>
                    {blogs.map(blog => <Blog key={blog.id} blog={blog}/>)}
                </div>     
            </div>
        
            }

        </div>
        
    )
}

export default App