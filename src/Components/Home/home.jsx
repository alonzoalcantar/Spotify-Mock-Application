import {accessToken, spotifyLogOut, spotifyProfile} from '../../Spotify/Spotify'
import { useState, useEffect } from 'react';


export default function Home() {

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
    
    
    return(
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
    )
}