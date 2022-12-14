import {accessToken, spotifyLogOut} from '../Spotify/Spotify'
import { useState, useEffect } from 'react';
import { StyledLogInButton, StyledLogOutButton } from './Homestyle';
import { StyledLogInPage } from './Homestyle';








export default function Home() {
    
    //Spotify Token
    
    const [token, setToken] = useState(null)
    
    useEffect(() => {
        setToken(accessToken);
    }, []);
    
    
    return(
    <StyledLogInPage>
    <div >
        <h1 >Spotify Log In</h1>
        
        { !token ? (
            
        <StyledLogInButton className='login'
        href='https://thawing-bayou-17998.herokuapp.com/login2spotify' >
            Log In to Spotify
        </StyledLogInButton> 
        
        ) : (

            


        <div>
            <h3 className='status'>Logged In</h3> 
            <StyledLogOutButton onClick={spotifyLogOut} className = 'logout'>Log Out of Spotify</StyledLogOutButton>
        </div>
        )}
        </div>
    </StyledLogInPage>
    )
}