import axios from "axios";
import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom"
import { spotifyIndividualPlaylist } from "../../../Spotify/Spotify";
import { StyledHeader } from "../../Profile/ProfileStyles"
import { PageLayout } from "../../Style/PageLayout";
import TopTracksList from "../TopTracks/TracksList";






export default function IndividualPlaylist() {

    const {id} = useParams();
    const [playlist, setPlaylist] = useState(null);
    const [tracksData, setTracksData] = useState(null);
    const [tracks, setTracks] = useState(null);



    useEffect(() => {
        const returnProfileData = async () => {
            const {data} = await spotifyIndividualPlaylist(id);
            setPlaylist(data)
            setTracksData(data.tracks)
        };

        returnProfileData();
    }, [id]);


    useEffect(() => {
        if(!tracksData) {
            return;
        }


        const returnMoreData = async () => {
            if(tracksData.next) {
                const {data} = await axios.get(tracksData.next);
                setTracksData(data)
            }
        };




        setTracks(tracks => ([
            ...tracks ? tracks : [],
            ...tracksData.items
        ]));

        returnMoreData();
    }, [tracksData]);



    const tracksFromPlaylist = useMemo(() => {
        if (!tracks) {
          return;
        }
        return tracks.map(({ track }) => track);
      }, [tracks]);
    




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

                        <div>
                        <PageLayout breadcrumb='true'>
                            {tracksFromPlaylist && (
                                <TopTracksList tracks = {tracksFromPlaylist} />
                            )}
                        </PageLayout>


                        </div>



                        </div>
                    )}
                </div>
            )
        }