import { useState } from 'react'

const LoginForm = ({loginUser}) => {
    const [username, setUsername] = useState([])
    const [password, setPassword] = useState([])

    const handleLogin = async (event) => {
        event.preventDefault()
        loginUser({
            username:username,
            password:password
        })
        setUsername('')
        setPassword('')
    }

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    Username <input type='text' value={username} onChange={(event)=>setUsername(event.target.value)}/>
                </div>
                <div>
                    Password <input type='password' value={password} onChange={(event)=>setPassword(event.target.value)}/>
                </div>
                <button type="submit">Login</button>
            </form>
        </div>)

}
  
  export default LoginForm