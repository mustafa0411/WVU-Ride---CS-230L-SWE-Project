import './App.css';
import Login from './Components/Login'
import CreateAccount from './Components/CreateAccount';
import HomePage from './Components/HomePage';
import Profile from './Components/Profile';
import Message from './Components/Message';
import CreatePost from './Components/CreatePost';
import SearchPosts from './Components/SearchPosts';
import ForgotPW from './Components/ForgotPW';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";



function App() {

  return (
    <div className="App">


      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/createaccount" element={<CreateAccount />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/message" element={<Message />} />
          <Route path="/post" element={<CreatePost/>} />
          <Route path="/search" element={<SearchPosts/>}/>
          <Route path="/forgot-password" element={<ForgotPW/>}/>
        </Routes>
      </BrowserRouter>

    </div >
  );
}

export default App;
