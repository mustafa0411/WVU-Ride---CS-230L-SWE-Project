import React from "react";
import "./Login.css";
import { useState } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';

/**
 * Returns the Login page
 */
function Login() {
  localStorage.clear()


  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  /**
   * Posts to the database and checks to see if such a user exists then checks the password to see if it is correct. Throws alerts if the login info is incorrect
   *
   * @param {event} event the event to preventDefault()
   */
  async function checkLoginInfo(event) {
    event.preventDefault()

    const usernameElement = document.getElementById('username')
    const passwordElement = document.getElementById('password')
    const form = document.getElementById('L-form')

    const response = await axios.post("http://localhost:8800/login", {
      username: username,
      password: password,
    }).then(response => {
      console.log(response.status)
      console.log(response.data)
      return response.data
    }).catch(error => {
      if (error.status !== 200) {
        return null
      }
    });
    console.log(response)

    if (response == null || response.length == 0) {
      passwordElement.style.color = 'red'
      usernameElement.style.color = 'red'
      alert("Invalid username or password")
      console.log("null response")
      return
    }
    localStorage.setItem('user', JSON.stringify(response[0]))
    passwordElement.style.color = 'black'
    usernameElement.style.color = 'black'
    window.location.href = "/home"
    return

  }


  return (
    <div className="login-container">
      <div className="login-function">
        <h2 className="login">Login</h2>
        <div className="login-underline"></div>
        <form id='L-form' name='L-form'>
          <div className="form-group">
            <label htmlFor="username">
              <input type="text" id="username" name="username" placeholder="Username"
                onInput={e => setUsername(e.target.value)} />
              <div className="input-underline"></div>
            </label>
          </div>
          <div className="form-group">
            <label htmlFor="password" className="creds">
              <input type="password" id="password" name="password" placeholder="Password"
                onInput={e => setPassword(e.target.value)} />
              <div className="input-underline"></div>
            </label>
          </div>
          <button type="submit" className="login-btn" data-testid="login-button" onClick={checkLoginInfo}>Login</button>
        </form>
        <div className="links">
          <span>Don't have an account?<br></br><Link to="/createaccount"><a href="/createaccount">Create Account</a></Link></span>
          <span><Link to="/forgot-password"><a href="/forgot-password">Forgot Password?</a></Link></span>
        </div>
      </div>
      <div className="map-container-lg">
        <div className="map-design-lg">
          <div className="blue-bg-lg">
          </div>
        </div>
        <div className="wvu-logo-lg"></div>
      </div>
    </div>
  );
}

export default Login;
