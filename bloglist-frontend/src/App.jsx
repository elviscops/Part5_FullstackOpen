import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForms from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'


const Notification = ({ message,mood }) => {
    const notificationClass = mood ? 'notificationPositive' : 'notificationNegative'
    if (message === null) {
        return null
    }
    return (<div className={notificationClass}>{message}</div>)
}

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null)
    const [notificationMessage, setNotificationMessage] = useState('')
    const [notificationMood, setNotificationMood] = useState(true)

    const blogFormRef = useRef()

    useEffect(() => {
            blogService.getAll().then(blogs => {
                const blogList = blogs.sort((a,b) => b.likes - a.likes)
                setBlogs( blogList )
                setTimeout(() => {
                setNotificationMessage(null,false)
                }, 0)
            }
        )
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedInUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
      }, [])

    const logoutUser = async ( event ) => {
        window.localStorage.removeItem('loggedInUser')
        window.localStorage.clear()
    }

    const loginUser = async ({ username,password }) => {
        try {
            const user = await loginService.login({ username,password })
            window.localStorage.setItem('loggedInUser',JSON.stringify(user))
            setUser(user)
            blogService.setToken(user.token)
        } catch (exception) {
            setNotificationMessage('Wrong username or password',true)
                setNotificationMood(false)
                setTimeout(() => {
                    setNotificationMessage(null)
                    }, 5000)
        }
    }

    const createNewBlog = async (newBlog) => {
        try {
            blogFormRef.current.toggleVisibility()
            const blog = await blogService.create(newBlog)
            setBlogs(blogs.concat(blog))
            setNotificationMessage(`New Blog: ${blog.title} by ${blog.author} added`,true)
                setNotificationMood(true)
                setTimeout(() => {
                    setNotificationMessage(null)
                    }, 5000)
        } catch (exception) {
            console.log(exception)
        }
      }


    const likeBlogPost = async likedBlog => {
        await blogService.like(likedBlog.id ,likedBlog)
        const blogs = await blogService.getAll().then(blogs => {
            const blogList = blogs.sort((a,b) => b.likes - a.likes)
            setBlogs( blogList )
        }
        )
    }

    const deleteBlogPost = async id => {
        await blogService.deleteBlog(id)
        const blogs = await blogService.getAll().then(blogs => {
            const blogList = blogs.sort((a,b) => b.likes - a.likes)
            setBlogs( blogList )
        }
        )

    }

    return (
        <div>
            <h1>Blogs List Page</h1>
            {  user === null &&
                <div>
                    <div>
                        <Notification message={notificationMessage} mood={notificationMood}/>
                    </div>
                    <div>
                        <LoginForm loginUser={loginUser}/>
                    </div>
                </div>
                }

            {  user !== null &&
                <div>
                    <div>
                        <div>
                            <Notification message={notificationMessage} mood={notificationMood}/>
                        </div>
                        <div>{user.username} has been logged in: </div>
                        <div>
                            <form onSubmit={logoutUser}>
                                <button type="submit">Log Out</button>
                            </form>
                        </div>
                    </div>
                    <br></br>
                    <div className='addBlogForm'>
                        <Togglable buttonLabel="Add New Blog" ref={blogFormRef}>
                            <BlogForms createNewBlog={createNewBlog}/>
                        </Togglable>
                        <br></br>
                    </div>
                    <div>
                        {blogs.map(blog => <Blog key={blog.id} blog={blog} likeBlogPost={likeBlogPost} deleteBlogPost={deleteBlogPost} username={user.username} />)}
                    </div>
                </div>
            }
        </div>
    )
}

export default App