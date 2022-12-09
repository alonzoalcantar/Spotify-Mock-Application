import { PageLayout } from "../../Style/PageLayout"
import { useEffect, useState } from "react";
import { spotifyPlaylists } from "../../../Spotify/Spotify";
import PlaylistList from "./PlaylistList"
import axios from "axios";



export default function PlaylistsPage() {

    const [playlistData, setPlaylistData] = useState(null);
    const [playlist, setPlaylist] = useState(null);


    useEffect(() => {
        
        const returnProfileData = async () => {
            try {


                const userPlaylist = await spotifyPlaylists();
                setPlaylistData(userPlaylist.data);


            } catch (err) {
                console.error(err);
            }
        }
        returnProfileData();
    }, []);
  
  
    useEffect(() => {

    if(!playlistData) {
        return;
    }
        
    const returnMoreData = async () => {
        if(playlistData.next && playlistData.next !==null){

            const {data} = await axios.get(playlistData.next);
            setPlaylistData(data);


        } 
    };
    
    setPlaylist(playlist =>([
        ...playlist ? playlist : [],
        ...playlistData.items
    ]));
    
    returnMoreData()
 
}, [playlistData]);

//React strict mode???^^



    return(
    <div>
    <PageLayout breadcrumb='true'>
        {playlist &&  (
        <PlaylistList playlists={playlist} />
        )}
    </PageLayout>
    </div>
    )
}