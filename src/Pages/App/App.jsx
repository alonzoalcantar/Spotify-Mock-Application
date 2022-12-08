import { Route, Routes } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import { useState, useEffect } from 'react';
import AuthPage from '../AuthPage/AuthPage'
import Home from '../../Components/Home/home'
import Profile from '../../Components/Profile/profile'
import Navbar from '../../Components/Navbar/navbar';
// import SpotifyLogInForm from '../../Components/SpotifyLogIn/SpotifyLogInForm';

import {accessToken, spotifyLogOut, spotifyProfile} from '../../Spotify/Spotify'



function App() {
  //Application User
  const [user, setUser]= useState(getUser());
  
  //Spotify Token
  const [token, setToken] = useState(null)

  //Spotify Profile 
  const [profile, setProfile] = useState(null);
  
  
  
  useEffect(() => {
    setToken(accessToken);


    const returnProfileData = async () => {
      try {

        const {data} = await spotifyProfile();
        setProfile(data);

        console.log(data)

    } catch (err) {

      console.error(err);

    }
  }

  returnProfileData();

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
          <div>
          <h1>Logged In</h1> 
          <button onClick={spotifyLogOut}>Log Out of Spotify</button>

          {profile && (
            <div>
            <h1>{profile.display_name}</h1>
            <p>Followers: {profile.followers.total} </p>
            {profile.images.length && profile.images[0].url && (
              <img src = {profile.images[0].url} alt = 'profile_picture'/>
            )}
            </div>
          )}
          </div>
        )}
        </div>


      </div>

    </div>
  );
}

export default App;
