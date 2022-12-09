
import { useState , useEffect} from "react";
import { spotifyTopArtists } from "../../../Spotify/Spotify";
import { PageLayout } from "../../Style/PageLayout";
import HistoryRangeButton from "../Button/HistoryRangeButton";
import ArtistList from "./ArtistList";

export default function TopArtistPage () {


    const [topArtist, setTopArtist] = useState(null);
    const [historyRange, setHistoryRange] = useState('short');


    useEffect(() => {
        
        const returnProfileData = async () => {
            try {

                const userTopArtist = await spotifyTopArtists(`${historyRange}_term`);
                setTopArtist(userTopArtist.data);

            } catch (err) {
                console.error(err);
            }
        }
        returnProfileData();
    }, [historyRange]);
  

    console.log(topArtist)

    return(
        <div>
            {topArtist && (

            <PageLayout breadcrumb='true'>
               
                <HistoryRangeButton 
                historyRange = {historyRange}
                setHistoryRange = {setHistoryRange}/>


                <ArtistList artists={topArtist.items.slice(0,10)} />
            </PageLayout>
            )}
        </div>
    )
}