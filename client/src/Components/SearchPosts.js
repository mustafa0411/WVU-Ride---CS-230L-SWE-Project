import React from "react";
import { useState, useEffect, useCallback } from "react";
import "./SearchPosts.css"
import { Link } from "react-router-dom";
import axios from 'axios';

/**
 * Returns a post HTML object
 *
 * @param {post} post the post to be made into an HTML object to display on the home page
 */
function Post(post) {
    const gasFlagClass = post.gas === 0 ? 'flag-button-hm no-gas-hm' : 'flag-button-hm gas-hm';

    const gasFlagPrint = post.gas === 0 ? 'No Gas' : 'Gas';

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
 * Returns the Search Posts page
 */
function SearchPosts() {
    if (localStorage.getItem('user') === null) {
        window.location.href = '/'
    }

    const [searchTo, setTo] = useState("")
    //console.log(searchTo)
    const [searchFrom, setFrom] = useState("")
    //console.log(searchFrom)
    const [searchGas, setGas] = useState(-1)
    console.log(searchGas)

    /**
     * Returns x raised to the n-th power.
     *
     * @param {event} e to preventDefault()
     */
    function inputGas(e) {
        if (searchGas === -1 || searchGas === 0) {
            setGas(1)
        }
        else {
            setGas(-1)
        }
    }
    /**
     * Returns x raised to the n-th power.
     *
     * @param {event} e to preventDefault()
     */
    function inputNoGas(e) {
        if (searchGas === -1 || searchGas === 1) {
            setGas(0)
        }
        else {
            setGas(-1)
        }
    }


    const [posts, setPosts] = useState({ loaded: false, data: [] })

    /**
     * Returns the response from a get request for a list of posts
     */
    const fetchPosts = useCallback(async () => {
        const response = await axios.post("http://localhost:8800/searchPosts", {
            to: searchTo,
            from: searchFrom,
            gas: searchGas
        }).then(response => {
            return response.data
        }).catch(error => {
            if (error.status !== 200) {
                return null
            }
        });
        console.log(response)
        setPosts({ loaded: true, data: response })
    }, [setPosts, searchTo, searchFrom, searchGas])

    /**
     * Calls fetchPosts if the useState for posts is not currently loaded with data
     */
    useEffect(() => {
        if (!posts.loaded) {
            fetchPosts()
        }
    }, [fetchPosts, posts.loaded])

    return (
        <div className='search-posts-container'>
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


            <div className="searching-container">
                <div className="search-bar-from">
                    <input type="text" className="search-input-fm" placeholder="From:" onInput={e => setFrom(e.target.value)}></input>
                </div>
                <div className="search-bar-to">
                    <input type="text" className="search-input-to" placeholder="To:" onInput={e => setTo(e.target.value)}></input>
                </div>

                <div className="filter-btns-sr">
                    <label>
                        <input type="checkbox" name="gas" className="gas-sr" onInput={e => inputGas()} />
                        <span className="flag-button-sr gas-sr" >Gas</span>
                    </label>
                    <label>
                        <input type="checkbox" name="no-gas" className="no-gas-sr" onInput={e => inputNoGas(0)} />
                        <span className="flag-button-sr no-gas-sr">No Gas</span>
                    </label>
                </div>
                <button type="button" className="search-post-btn" onClick={e => fetchPosts()}>Search</button>
            </div >

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
        </div >
    )
}

export default SearchPosts;