import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

// Components 
import LoginPage from './Login.js';
import HomePage from './HomePage.js';

function App() {
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [error, setError] = React.useState('');


    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    {/* Redirect to login page if not logged in */}
                    {isLoggedIn ? <Redirect to="/home" /> : <LoginPage onLogin={handleLogin} error={error} />}
                </Route>
                <Route path="/home">
                    {/* Show home page if logged in */}
                    {isLoggedIn ? <HomePage /> : <Redirect to="/" />}
                </Route>
            </Switch>
        </Router>
    );
}

export default App;

