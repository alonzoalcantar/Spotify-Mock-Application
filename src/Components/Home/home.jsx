import {accessToken, spotifyLogOut} from '../../Spotify/Spotify'
import { useState, useEffect } from 'react';


export default function Home() {
    
    //Spotify Token
    
    const [token, setToken] = useState(null)
    
    useEffect(() => {
        setToken(accessToken);
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
        </div>
        )}
        </div>
    )
}