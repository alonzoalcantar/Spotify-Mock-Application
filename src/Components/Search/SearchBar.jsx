
import { Container, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import { accessToken } from "../../Spotify/Spotify";
import SpotifyWebApi from "spotify-web-api-node";
import SearchResult from "./SearchResult";
import TrackPlayer from "../TrackPlayer/TrackPlayer";
import axios from "axios";


const spotifySearchAPI = new SpotifyWebApi({
    clientId: 'db17ff3463f04889bd7c0ef6018e8ec0'
}
)

export default function Searchbar(){

    const [search , setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [currentTrack, setCurrentTrack] = useState()
    const [lyrics, setLyrics] = useState('')


    function selectTrack(track){
        setCurrentTrack(track)
        setSearch('')
        setLyrics('')
    }


    useEffect(() =>{
        if(!currentTrack) return

        axios.get('http://localhost:3001/lyrics',{
            params: {
                track: currentTrack.title,
                artist: currentTrack.artist
            }
        }).then(res => {
            setLyrics(res.data.lyrics)
        })
    })


    useEffect(() => {
        if(!accessToken) return
        spotifySearchAPI.setAccessToken(accessToken)
    },[])




    useEffect(() => {
        if(!search) return setSearchResults([])
        if(!accessToken) return 
        let cancelSearch = false
        spotifySearchAPI.searchTracks(search).then(res =>{
            if (cancelSearch) return

            setSearchResults(res.body.tracks.items.map(track => {
                //gets smallest image
                const albumImage = track.album.images.reduce(
                    (smallest, image) =>{
                        if(image.height < smallest.height) return image
                        return smallest
                    }, track.album.images[0])

                return {
                    artist: track.artists[0].name,
                    title: track.name,
                    uri: track.uri,
                    albumUrl: albumImage.url
                }
            }))
        })
        return() => cancelSearch = true
    },[search])

    return(

            <Container className="d-flex flex-column py-2" style={{height: '100vh' }}>
            <Form.Control type='search'
            placeholder='Search Songs / Artist'
            value = {search}
            onChange = {event => setSearch(event.target.value)}/>
            <div className='= flex-frow-1 my-2' style = {{overflowY: 'auto'}}>
                {searchResults.map(track =>(
                    <SearchResult track = {track} key = {track.uri} selectTrack={selectTrack}/>
                ))}

                {searchResults.length === 0 && (
                    <div className="text-center" style={{whiteSpace: 'pre'}}>
                        {lyrics}
                    </div>
                )}
            </div>
            <div><TrackPlayer accessToken={accessToken} trackUri={currentTrack?.uri} /></div>
            </Container>

    )
}