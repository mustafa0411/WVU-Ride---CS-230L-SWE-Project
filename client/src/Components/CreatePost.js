import React from "react";
import { useState } from "react";
import "./CreatePost.css";
import { Link } from "react-router-dom";
import axios from 'axios';


/**
 * Returns the Create Post page
 */
const CreatePost = () => {
  if (localStorage.getItem('user') === null) {
    window.location.href = '/'
  }

  const [postTitle, setTitle] = useState('')
  const [postFrom, setFrom] = useState('')
  const [gas, setGas] = useState(0)
  const [postDesc, setDesc] = useState('')
  const [postTo, setTo] = useState('')


  /**
 * Checks to see if all input matches the requirements and then if it passes posts the post to the database.
 *
 * @param {event} e to precentDefault()
 */
  async function onPost(e) {
    e.preventDefault();
    if (postTitle == '' || postFrom == '' || postTo == '' || postTitle.length > 45 || postDesc.length > 500 || postTo.length > 45 || postFrom.length > 45) {
      var errMsg = ""
      if (postTitle == '') {
        errMsg += "Title can't be empty"
      }
      if (postFrom == '') {
        if (errMsg == "") {
          errMsg += "From can't be empty"
        }
        else {
          errMsg += ", From can't be empty"
        }
      }
      if (postTo == '') {
        if (errMsg == "") {
          errMsg += "To can't be empty"
        }
        else {
          errMsg += ", To can't be empty"
        }
      }
      if (postTitle.length > 45) {
        if (errMsg == "") {
          errMsg += "Title is too long"
        }
        else {
          errMsg += ", Title is too long"
        }
      }
      if (postDesc.length > 500) {
        if (errMsg == "") {
          errMsg += "Description is too long"
        }
        else {
          errMsg += ", Description is too long"
        }
      }
      if (postTo.length > 45) {
        if (errMsg == "") {
          errMsg += "To is too long"
        }
        else {
          errMsg += ", To is too long"
        }
      }
      if (postFrom.length > 45) {
        if (errMsg == "") {
          errMsg += "From is too long"
        }
        else {
          errMsg += ", and From is too long"
        }
      }
      alert(errMsg)
      return
    }
    else {
      const response = await axios.post("http://localhost:8800/postAPost", {
        //When unit testing comment the line below this comment out
        username: JSON.parse(localStorage.getItem("user")).username,
        from: postFrom,
        to: postTo,
        gasFlag: gas,
        desc: postDesc,
        title: postTitle
      }).then(response => {
        console.log(response.status)
        console.log(response.data)
        return response.data
      }).catch(error => {
        if (error.status !== 200) {
          console.log("could not post")
          alert("Your post could not be sent to the server. Please try again later.")
          return null
        }
      });
      window.location.href = "/home"
      return
    }
  }

  return (
    <div className="plus-posts-container">
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
      <div className="cpost-container">
        <div className="cpost-title-container">
          <div className="cpost-title">Post your Ride</div>
          <div className="cpost-underline"></div>
        </div>
        <form className="create-post-form">
          <label className="divide"></label>
          <input type="text" placeholder="Title" className="title-input" name="title" onInput={e => setTitle(e.target.value)} required />
          <textarea className="desc-input" name="desc" rows="10" cols="36" placeholder="Description" onInput={e => setDesc(e.target.value)}></textarea>
          <div className="filter-container">
            <label className="flags-label">Flags:</label>
            <div className="under-flags"></div>
            <div className="filter-btns">
              <label>
                <input type="checkbox" name="gas" className="gas" onInput={e => setGas(1)} />
                <span className="flag-button gas" >Gas</span>
              </label>
              <label>
                <input type="checkbox" name="no-gas" className="no-gas" onInput={e => setGas(0)} />
                <span className="flag-button no-gas">No Gas</span>
              </label>
            </div>
            <div className="loc-range">
              <input type="text" className="FROM" placeholder="From:" required onInput={e => setFrom(e.target.value)}></input>
              <input type="text" className="TO" placeholder="To:" required onInput={e => setTo(e.target.value)}></input>

            </div>
          </div>
          <button type="submit" className="create-post-btn" onClick={e => onPost(e)}>Create Post</button>


        </form>
      </div >


    </div >

  )
}

export default CreatePost