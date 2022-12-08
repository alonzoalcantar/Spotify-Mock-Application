import {accessToken, spotifyLogOut} from '../../Spotify/Spotify'
import { useState, useEffect } from 'react';
import { StyledLogInButton } from './homestyle';








export default function Home() {
    
    //Spotify Token
    
    const [token, setToken] = useState(null)
    
    useEffect(() => {
        setToken(accessToken);
    }, []);
    
    
    return(
    <div className='home'>
        <h1 className='title'>Spotify Log In</h1>
        
        { !token ? (
            
        <StyledLogInButton className='login'
        href='http://localhost:3001/login2spotify' >
            Log In to Spotify
        </StyledLogInButton> 
        
        ) : (

            


        <div>
            <h3 className='status'>Logged In</h3> 
            <button onClick={spotifyLogOut} className = 'logout'>Log Out of Spotify</button>
        </div>
        )}
        </div>
    )
}