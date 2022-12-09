import axios from "axios";
import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom"
import { spotifyIndividualPlaylist, spotifyAudioFeatures } from "../../../Spotify/Spotify";
import { StyledHeader } from "../../Profile/ProfileStyles"
import { StyledSelectDropDown } from "../../SelectDropDown/StyledSelectDropDown";
import { PageLayout } from "../../Style/PageLayout";
import TopTracksList from "../TopTracks/TracksList";






export default function IndividualPlaylist() {

    const {id} = useParams();
    const [playlist, setPlaylist] = useState(null);
    const [tracksData, setTracksData] = useState(null);
    const [tracks, setTracks] = useState(null);
    const [audioFeatures, setAudioFeatures] = useState(null);
    const [sortPlaylist, setSortPlaylist] = useState('');
    const selectSort = ['danceability', 'tempo', 'energy'];


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

        returnMoreData()


        setTracks(tracks => ([
            ...tracks ? tracks : [],
            ...tracksData.items
        ]));



        const returnAudioFeatures = async () => {
            const ids = tracksData.items.map(({track}) => track.id).join(',');
            const {data} = await spotifyAudioFeatures(ids);
            setAudioFeatures(audioFeatures => ([
                ...audioFeatures ? audioFeatures : [],
                ...data['audio_features']
            ]));
        };

        returnAudioFeatures()



    }, [tracksData]);



    const tracksFromPlaylist = useMemo(() => {
        if (!tracks || !audioFeatures) {
          return null;
        }
        return tracks.map(({ track }) => {
            const addTrack = track;

            if(!track.audio_features) {
                const audioFeaturesObject = audioFeatures.find(item => {
                    if(!item || !track) {
                        return null;
                    }
                    return item.id === track.id;
                });

            addTrack['audio_features'] = audioFeaturesObject;
            }

            return addTrack;
        });


      }, [tracks, audioFeatures]);


      const sortedPlaylist = useMemo(() => {
        if(!tracksFromPlaylist) {
            return null;
        }

        return [...tracksFromPlaylist].sort((first, second) => {
            const firstFeature = first['audio_features'];
            const secondFeature = second['audio_features'];

            if(!firstFeature || !secondFeature) {
                return false;
            }

            return secondFeature[sortPlaylist] - firstFeature[sortPlaylist];

        });
      }, [sortPlaylist, tracksFromPlaylist])
    

console.log(tracksFromPlaylist)

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
                                
                            <StyledSelectDropDown active = {!!sortPlaylist}>
                                <label className='sort_playlist'>Sort Tracks: </label>
                                <select
                                id= 'sort_method'
                                onChange={event =>setSortPlaylist(event.target.value)}>
                                    <option value=''>Sort Tracks</option>
                                    {selectSort.map((select, idx) =>(
                                        <option value={select} key={idx}>
                                            {`${select.charAt(0).toUpperCase()}${select.slice(1)}`}
                                        </option>
                                    ))}

                                </select>
                            </StyledSelectDropDown>



                            {sortedPlaylist && (
                                <TopTracksList tracks = {sortedPlaylist} />
                            )}
                        </PageLayout>


                        </div>



                        </div>
                    )}
                </div>
            )
        }