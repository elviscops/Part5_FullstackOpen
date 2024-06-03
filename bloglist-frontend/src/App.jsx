import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForms from './components/BlogForm'
import LoginFormss from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'


const Notification = ({message,mood}) => {
    const notificationClass = mood ? 'notificationPositive' : 'notificationNegative';
    if (message === null) {
        return null
    }
    return (<div className={notificationClass}>{message}</div>)
}

const Togglable = (props) => {
    const [visible, setVisible] = useState(false)
    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }
    const toggleVisibility = () => setVisible(!visible)

    return ( 
        <div>
            <div style={hideWhenVisible}>
                <button onClick={toggleVisibility}>{props.buttonLabel}</button>
            </div>
            <div style={showWhenVisible}>
                {props.children}
                <button onClick={toggleVisibility}>Close</button>
            </div>
        </div>
    )
}

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null)
    const [notificationMessage, setNotificationMessage] = useState('')
    const [notificationMood, setNotificationMood] = useState(true)

    useEffect(() => {
        blogService.getAll().then(blogs =>
        setBlogs( blogs ),
        setTimeout(() => {
            setNotificationMessage(null,false)
          }, 0)
        )  
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedInUser')
        if (loggedUserJSON) {
          const user = JSON.parse(loggedUserJSON)
          setUser(user)
        }
      }, [])

    const logoutUser = async (event) => {
        window.localStorage.removeItem('loggedNoteappUser')
        window.localStorage.clear()
    }

    const loginUser = async ({username,password}) => {
        try {
            const user = await loginService.login({username,password})
            window.localStorage.setItem('loggedInUser', JSON.stringify(user)) 
            setUser(user)
            blogService.setToken(user.token)
        } catch (exception) {
            setNotificationMessage(`Wrong username or password`,true)
                setNotificationMood(false)
                setTimeout(() => {
                    setNotificationMessage(null)
                    }, 5000)
        }
    }

    const createNewBlog = async (newBlog) => {
        try {
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

    return (
        <div>
            <h1>Blogs List Page</h1>
            {  user === null &&
                <div>
                    <div>
                        <Notification message={notificationMessage} mood={notificationMood}/>
                    </div>
                    <div>
                        <LoginFormss loginUser={loginUser}/>
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
                    <div>
                        <Togglable buttonLabel="Add New Blog">
                            <BlogForms createNewBlog={createNewBlog}/>
                        </Togglable>
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