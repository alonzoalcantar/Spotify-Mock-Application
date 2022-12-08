import { Route, Routes } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import { useState, useEffect } from 'react';
import AuthPage from '../AuthPage/AuthPage'
import Home from '../../Components/Home/home'
import Profile from '../../Components/Profile/profile'
import Navbar from '../../Components/Navbar/navbar';
import SpotifyLogInForm from '../../Components/SpotifyLogIn/SpotifyLogInForm';

import {accessToken} from '../../Spotify/Spotify'



function App() {
  //Application User
  const [user, setUser]= useState(getUser());
  
  //Spotify Token
  const [token, setToken] = useState(null)
  
  
  
  useEffect(() => {
    setToken(accessToken)
  }, []);




  return (
    <div className="App">
      <header className="App-header">
        { user ?
        <>
        <Navbar
        user = {user}
        setUser = {setUser}/> 
        <Routes>
          {/* <Route path='/spotify' element={<SpotifyLogInForm/>}/> */}
          <Route path='/' element={<Home/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/home' element={<Home/>}/> 
          <Route path='/authpage' element={<AuthPage/>}/>
        </Routes>
        </>
        : 
        <AuthPage
        setUser = {setUser}/>
}
      </header>
      <div>

      <div>
      <h1>Spotify Log In</h1>


        { !token ? (
        <a
        href='http://localhost:3001/login2spotify' >
            Log In to Spotify
        </a> 
        ) : (
          <h1>Logged In</h1>
        )}
        </div>


      </div>

    </div>
  );
}

export default App;
