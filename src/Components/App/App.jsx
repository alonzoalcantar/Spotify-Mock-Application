import { Route, Routes } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import { useState } from 'react';
import { GlobalStyle } from '../Style/GlobalStyle';
import AuthPage from '../../Pages/AuthPage/AuthPage'
import Home from '../Home/Home'
import Profile from '../Profile/Profile'
import Navbar from '../Navbar/Navbar';
import TopArtists from '../SpotifyData/TopArtist/TopArtistPage';
import TopTracks from '../SpotifyData/TopTracks/TopTracksPage';
import IndividualPlaylist from '../SpotifyData/Playlist/IndividualPlaylist';
import Playlists from '../SpotifyData/Playlist/PlaylistsPage';
import Searchbar from '../Search/SearchBar';



function App() {
  //Application User
  const [user, setUser]= useState(getUser());


  return (
    <div className="App">
      <GlobalStyle/>
      <header className="App-header">
        { user ?
        <>
        <Navbar
        user = {user}
        setUser = {setUser}/> 
        <Routes>


          <Route path='/' element={<Home />}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/home' element={<Home/>}/> 
          <Route path='/authpage' element={<AuthPage/>}/>
          <Route path='/search' element={<Searchbar/>}/>
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
