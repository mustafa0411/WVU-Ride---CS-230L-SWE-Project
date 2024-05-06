import React from 'react'
import { Link } from "react-router-dom";
const Message = () => {
    if (localStorage.getItem('user') === null) {
        window.location.href = '/'
    }
    return (
        <div className="msg-container">
            <div className="blue-rect">
                <div className="side-btns">
                    <Link to="/profile"><button className="profile-btn"></button></Link>
                    <Link to="/home"><button className="home-btn"></button></Link>
                    <Link to="/search"><button className="search-btn"></button></Link>
                    <Link to="/message"><button className="msg-btn"></button></Link>
                    <Link to="/"><button className="out-btn"></button></Link>
                    <Link to="/post"><button className="post-btn"></button></Link>
                </div>
            </div>
        </div>

    )
}

export default Message