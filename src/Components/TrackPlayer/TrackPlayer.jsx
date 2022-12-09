import SpotifyWebPlayer from "react-spotify-web-playback"

export default function TrackPlayer({accessToken, trackUri}) {
    if(!accessToken) return null
    return(
        <div><SpotifyWebPlayer
        token={accessToken}
        showSaveIcon
        uris={trackUri ? [trackUri] : []}
        />
        
        </div>
    )
}