import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ states,functions }) => {
    const [username,password] = states
    const [setUsername,setPassword,handleLogin] = functions
    return (
    <form onSubmit={handleLogin} >
        <h2>Log In</h2>
        <input type='text' placeholder='username' value={username} onChange={(event) => setUsername(event.target.value)} /><br/>
        <input type='password' placeholder='password' value={password} onChange={(event) => setPassword(event.target.value)} /><br/>
        <button type='submit'>Log In</button>
    </form>)
}
LoginForm.propTypes = {
    states : PropTypes.array.isRequired,
    functions : PropTypes.array.isRequired
}
export default LoginForm