import { Route, Routes, useLocation } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import { useState, useEffect} from 'react';
import { GlobalStyle } from '../../Components/Style/GlobalStyle';
import AuthPage from '../AuthPage/AuthPage'
import Home from '../../Components/Home/Home'
import Profile from '../../Components/Profile/Profile'
import Navbar from '../../Components/Navbar/Navbar';
import TopArtists from '../../Components/SpotifyData/TopArtist/ArtistList';
import TopTracks from '../../Components/SpotifyData/TopTracks/Top-Tracks';
import IndividualPlaylist from '../../Components/SpotifyData/Playlist/IndividualPlaylist';
import Playlists from '../../Components/SpotifyData/Playlist/Playlists';



// function ScrollToTop() {
//   const {pathname} = useLocation();

//   useEffect(() => {
//     window.scrollTo(0,0);
//   },[pathname]);
//   return null
// }


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
