import React from "react";
import { useState } from "react";
import "./CreateAccount.css";
import { Link } from "react-router-dom";
import axios from 'axios';

/**
 * Returns the Create Account page
 *
 */
function CreateAccount() {
    
    // State variables to manage form input values
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');



    /**
     * Checks that all inputs match the required criteria and checks if the email 
     * is already in use then posts the new user to the database and reroutes 
     * the user to the login page
     *
     * @param {event} event the event to preventDefault()
     */
    async function checkForm(event) {
        event.preventDefault(); // Preventing default form submission behavior
        // Extracting domain from email address
        const domain = email.substring(email.indexOf("@") + 1)
        const targetDomain = "mix.wvu.edu"

        // Retrieving form input elements
        const element1 = document.getElementById("email")
        const element2 = document.getElementById("password")
        const element3 = document.getElementById("confirm")
        const element4 = document.getElementById("name")
        const element5 = document.getElementById("username")

        // Validating form inputs
        if (domain !== targetDomain || email == "" || confirm == "" || password == "" || confirm !== password || name == "" || username == "") {
            // Handling invalid inputs
            var errorMsg = ""
            if (domain !== targetDomain || email == "") {
                element1.style.color = 'red'
                console.log("should be red")
                errorMsg += "Invalid email"
            }
            else {
                element1.style.color = 'black'
            }
            if (confirm !== password || confirm == "" || password == "") {
                element2.style.color = 'red'
                element3.style.color = 'red'
                if (errorMsg !== "") {
                    errorMsg += ", password"
                }
                else {
                    errorMsg += "Invalid password"
                }
            }
            else {
                element2.style.color = 'black'
                element3.style.color = 'black'
            }
            if (name == "") {
                element4.style.color = 'red'
                if (errorMsg !== "") {
                    errorMsg += ", name"
                }
                else {
                    errorMsg += "Invalid name"
                }
            }
            else {
                element4.style.color = 'black'
            }
            if (username == "") {
                element5.style.color = 'red'
                if (errorMsg !== "") {
                    errorMsg += ", username"
                }
                else {
                    errorMsg += "Invalid username"
                }
            }
            else {
                element5.style.color = 'black'
            }
            alert(errorMsg)
            return
        }
        else {
            // Valid form inputs
            const response = await axios.post("http://localhost:8800/login", {
                username: username,
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
            
            // Check if the email exists in the database 
            const emailResponse = await axios.post("http://localhost:8800/checkEmail", {
                email: email,
            }).then(response => {
                // If successful then insert into the dataabse
                console.log(response.status)
                console.log(response.data)
                return response.data
            }).catch(error => {
                // Throw an error if unsuccessful
                if (error.status !== 200) {
                    return null
                }
            });
            console.log(emailResponse)
            // If email and username are already present then it should send invalid alert
            // This is to prevent duplicate users
            if (response.length != 0 || emailResponse.length != 0) {
                if (emailResponse != 0) {
                    alert("Email already in use.")
                    element1.style.color = 'red'
                    return
                }
                else {
                    alert("Username already in use.")
                    element5.style.color = 'red'
                    return
                }

            }

            // If the invalid conditions are not met than all 
            // of the elements should change to default black
            element1.style.color = 'black'
            element2.style.color = 'black'
            element3.style.color = 'black'
            element4.style.color = 'black'
            element5.style.color = 'black'
            // Post request to create a new user to the database
            const sendResponse = await axios.post("http://localhost:8800/users", {
                // Elements and values linked to the db table columns
                email: email,
                password: password,
                fullName: name,
                username: username,
            }).then(response => {
                return response;
            });
            // Redirect the user to the login page to login using their newly created user info
            window.location.href = "/"
            return

        }
    }

    return (
        <div className="ca-container">
            <div title="CreateAccount" className="ca-function">
                <h2 title="CA-Title" className="ca-title">Please create an account.</h2>
                <div className="ca-underline"></div>
            </div>
            <form id='CA-Form' name='CA-Form'>
                <div className="form-group">
                    <label htmlFor="name"></label>
                    <input type="text" id="name" name="name" required="required" placeholder="Full Name"
                        onInput={e => setName(e.target.value)} />
                    <div className="input-underline"></div>
                </div>

                <div className="form-group">
                    <label htmlFor="email"></label>
                    <input type="email" id="email" name="email" required="required" placeholder="Mix Email"
                        onInput={e => setEmail(e.target.value)} />
                    <div className="input-underline"></div>
                </div>
                <div className="form-group">
                    <label htmlFor="username"></label>
                    <input type="text" id="username" name="username" required="required" placeholder="Username"
                        onInput={(e => setUsername(e.target.value))} />
                    <div className="input-underline"></div>
                </div>

                <div className="form-group">
                    <label htmlFor="password"></label>
                    <input type="password" id="password" name="password" required="required" placeholder="Password" onInput={e => setPassword(e.target.value)}></input>
                    <div className="input-underline"></div>
                </div>
                <div className="form-group">
                    <label htmlFor="confirm"></label>
                    <input type="password" id="confirm" name="confirm" required="required" placeholder="Confirm your password" onInput={e => setConfirm(e.target.value)}></input>
                    <div className="input-underline"></div>
                </div>

                <button type="submit" className="ca-btn" data-testid="create-button" onClick={checkForm}>Create Your Account</button>
            </form>
            <div className="links">
                <span><Link to="/"><a href="/login">Go back to login.</a></Link></span>
            </div>
            <div className="map-container-ca">
                <div className="map-design-ca">
                    <div className="blue-bg-ca">
                    </div>
                </div>
                <div className="wvu-logo-ca"></div>
            </div>
        </div>
    );
}

export default CreateAccount;