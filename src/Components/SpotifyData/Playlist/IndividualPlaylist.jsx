import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { spotifyIndividualPlaylist } from "../../../Spotify/Spotify";
import { StyledHeader } from "../../Profile/ProfileStyles"






export default function IndividualPlaylist() {

    const {id} = useParams();
    const [playlist, setPlaylist] = useState(null);



    useEffect(() => {
        const returnProfileData = async () => {
            const {data} = await spotifyIndividualPlaylist(id);
            setPlaylist(data)
        };

        returnProfileData();
    }, [id]);



    return(
        <div>
            {playlist && (
                <div>
                    <StyledHeader>
                        <div className= 'header_inner'>
                            {playlist.images.length && playlist.images[0].url && (
                            <img className='header_img' src={playlist.images[0].url} alt="Playlist_Artwork"/>
                            )}
                        <div>
                            <div className='header_overline'>Playlist</div>
                                <h1 className=''>{playlist.name}</h1>
                                <p className= 'header_meta'>
                                    {playlist.followers.total ? (
                                    <span>{playlist.followers.total} {`follower${playlist.followers.total !== 1 ? 's' : ''}`}</span>
                                    ) : null}
                                    <span>{playlist.tracks.total} {`song${playlist.tracks.total !== 1 ? 's' : ''}`}</span>
                                </p>
                            </div>
                        </div>
                        </StyledHeader>
                        </div>
                    )}
                </div>
            )
        }