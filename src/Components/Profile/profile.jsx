
import { useState, useEffect } from "react";
import { spotifyProfile } from "../../Spotify/Spotify";
import { StyledHeader} from "./profilestyles";


export default function Profile() {
    

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
        <>
          {profile && (
            <>
              <StyledHeader type="user">
                <div className="header_inner">
                  {profile.images.length && profile.images[0].url && (
                    <img className="header_img" src={profile.images[0].url} alt="profile_image"/>
                  )}
                  <div>
                    <div className="header_overline">Profile</div>
                    <h1 className="header_name">{profile.display_name}</h1>
                    <p className="header_meta">
                      <span>
                        {profile.followers.total} Follower{profile.followers.total !== 1 ? 's' : ''}
                      </span>
                    </p>
                  </div>
                </div>
              </StyledHeader>
            </>
          )}
        </>
      )
    };