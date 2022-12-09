
import { useState, useEffect } from "react";
import { spotifyProfile, spotifyPlaylists, spotifyTopArtists} from "../../Spotify/Spotify";
import { StyledHeader} from "./profilestyles";
import ArtistList from "../SpotifyData/TopArtist/ArtistList";
import { PageLayout } from "../Style/pagelayout";


export default function Profile() {
    

    //Spotify Profile 
    const [profile, setProfile] = useState(null);

    //Spotify Playlist 
    const [playlist, setPlaylist] = useState(null);

    //Spotify Top Artist 
    const [topArtist, setTopArtist] = useState(null);
    
    useEffect(() => {
        
        const returnProfileData = async () => {
            try {
                const userProfile = await spotifyProfile();
                setProfile(userProfile.data);

                const userPlaylist = await spotifyPlaylists();
                setPlaylist(userPlaylist.data);

                const userTopArtist = await spotifyTopArtists();
                setTopArtist(userTopArtist.data);

                console.log(userTopArtist.data)
                console.log(userProfile.data)
                console.log(userPlaylist.data)
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
                        {playlist && (
                        <span>
                            {playlist.total} Playlist{playlist.total !== 1 ? 's' : ''}
                        </span>
                        )}
                        &nbsp; | &nbsp;
                        <span>
                        {profile.followers.total} Follower{profile.followers.total !== 1 ? 's' : ''}
                        </span>
                    </p>
                  </div>
                </div>
              </StyledHeader>
            </>
          )}


          {topArtist && (
            <div>
                <PageLayout seeAllLink='/top-artists'>
                    <ArtistList artists={topArtist.items.slice(0,10)} />
                </PageLayout>
            </div>
          )}
        </>
      )
    };