
import { useState , useEffect} from "react";
import { spotifyTopTracks } from "../../../Spotify/Spotify";
import { PageLayout } from "../../Style/PageLayout";
import HistoryRangeButton from "../Button/HistoryRangeButton";
import TopTracksList from "./TracksList";

export default function TopTracksPage () {


    const [topTrack, setTopTracks] = useState(null);
    const [historyRange, setHistoryRange] = useState('short');


    useEffect(() => {
        
        const returnProfileData = async () => {
            try {

                const userTopTrack = await spotifyTopTracks(`${historyRange}_term`);
                setTopTracks(userTopTrack.data);

            } catch (err) {
                console.error(err);
            }
        }
        returnProfileData();
    }, [historyRange]);
  

    console.log(topTrack)

    return(
        <div>
            {topTrack && (

            <PageLayout breadcrumb='true'>
               
                <HistoryRangeButton 
                historyRange = {historyRange}
                setHistoryRange = {setHistoryRange}/>


                <TopTracksList tracks={topTrack.items.slice(0,10)} />
            </PageLayout>
            )}
        </div>
    )
}