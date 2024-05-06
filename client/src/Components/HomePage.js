import React from "react";
import "./HomePage.css";
import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./CreatePost.css"

/**
 * Returns a post HTML object
 *
 * @param {post} post the post to be made into an HTML object to display on the home page
 */
function Post(post) {
    console.log(post);
    // Determine the class name for the gas flag based on the postGas value
    const gasFlagClass = post.gas === 0 ? 'flag-button-hm no-gas-hm' : 'flag-button-hm gas-hm';
    const gasFlagPrint = post.gas === 0 ? 'No Gas' : 'Gas';

    // style={{color:black;}}
    return (
        <li className="post-item">
            <div className="post-content">
                <div className="post-text">
                    <h1 className="title">{post.title}</h1>
                    <p className="post-desc">{post.text}</p>
                    <p className="post-time">{post.time}</p>
                    <p className="post-from">From: {post.from}</p>
                    <p className="post-to">To: {post.to}</p>
                    <div className={gasFlagClass}>{gasFlagPrint}</div>
                </div>
                <button className="posts-pfp" />
                <p className="user-name">{post.userName}</p>
                <button className="message-btn">Talk</button>
            </div>
        </li>
    );
}




/**
 * Returns the Home page
 */
function HomePage() {
    if (localStorage.getItem('user') === null) {
        window.location.href = '/'
    }

    const [posts, setPosts] = useState({ loaded: false, data: [] })

    /**
     * Returns the response from a get request for a list of posts
     */
    const fetchPosts = useCallback(async () => {
        const response = await axios.get("http://localhost:8800/retrieve5Posts").then(response => {
            return response.data
        }).catch(error => {
            if (error.status !== 200) {
                return null
            }
        });
        setPosts({ loaded: true, data: response })
    }, [setPosts])

    /**
     * Calls fetchPosts if the useState for posts is not currently loaded with data
     */
    useEffect(() => {
        if (!posts.loaded) {
            fetchPosts()
        }
    }, [fetchPosts, posts.loaded])

    return (
        <div className="hp-container">
            <div className="blue-rect">
                <div className="side-btns">
                    <Link to="/profile"><button className="profile-btn" data-testid="profile-button"></button></Link>
                    <Link to="/home"><button className="home-btn" data-testid="home-button"></button></Link>
                    <Link to="/search"><button className="search-btn" data-testid="search-button"></button></Link>
                    <Link to="/message"><button className="msg-btn" data-testid="message-button"></button></Link>
                    <Link to="/"><button className="out-btn" data-testid="logout-button"></button></Link>
                    <Link to="/post"><button className="post-btn" data-testid="post-button"></button></Link>
                </div>
            </div>
            <div className="search-container">
            </div>
            <div className="post-container">
                <div className="title-container">
                    <div className="post-title">Posts</div>
                    <div className="post-underline"></div>
                </div>

                <ul className="post-list">
                    {posts.loaded && posts.data.length > 0 ? posts.data.map(post => {
                        console.log(post)
                        return <Post
                            text={post.postDesc}
                            time={post.postTime}
                            userName={post.postAuth}
                            title={post.postTitle}
                            from={post.postFrom}
                            to={post.postTo}
                            gas={post.postGas}

                        />
                    }) : null}
                </ul>
            </div>
        </div>
    );
}

export default HomePage;
