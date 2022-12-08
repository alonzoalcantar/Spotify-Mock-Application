import { Route, Routes } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import { useState} from 'react';
import AuthPage from '../AuthPage/AuthPage'
import Home from '../../Components/Home/home'
import Profile from '../../Components/Profile/profile'
import Navbar from '../../Components/Navbar/navbar';
import TopArtists from '../../Components/SpotifyData/Top-Artists';
import TopTracks from '../../Components/SpotifyData/Top-Tracks';
import IndividualPlaylist from '../../Components/SpotifyData/IndividualPlaylist';
import Playlists from '../../Components/SpotifyData/Playlists';




function App() {
  //Application User
  const [user, setUser]= useState(getUser());


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
          <Route path='/' element={<Home />}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/home' element={<Home/>}/> 
          <Route path='/authpage' element={<AuthPage/>}/>

          <Route path='/top-artists' element = {<TopArtists/>}/>
          <Route path='/top-tracks' element = {<TopTracks/>} />
          <Route path='/playlists/:id' element = {<IndividualPlaylist/>} />
          <Route path='/playlists' element = {<Playlists />} />
        </Routes>
        </>
        : 
        <AuthPage
        setUser = {setUser}/>
}
      </header>
      <div>

      </div>

    </div>
  );
}

export default App;
