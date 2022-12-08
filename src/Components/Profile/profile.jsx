import { checkToken } from "../../utilities/users-service"
import { useState, useEffect } from "react";
import { spotifyProfile } from "../../Spotify/Spotify";
import './profile.css'

export default function Profile() {
    
    async function handleCheckToken() {
    const expDate = await checkToken();
    console.log(expDate);
}
    //Spotify Profile 
    const [profile, setProfile] = useState(null);
    
    useEffect(() => {
        
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
    <div className="profile">
        
        <header className="header">
        <h1>Profile Page</h1>
        <button onClick={handleCheckToken}>Check When Log In Token Expires</button>
        </header>


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
    )
}