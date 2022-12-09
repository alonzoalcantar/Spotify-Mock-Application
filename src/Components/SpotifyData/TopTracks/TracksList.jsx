import { StyledTrackList } from "./StyledTrackList";


export default function TopTracksList ({tracks}){

    const formatDuration = (ms)=> {
        const minuets = Math.floor(ms / 60000);
        const seconds = Math.floor((ms % 60000 / 1000));
        return `${minuets}:${seconds < 10 ? '0' : ''}${seconds}`
    }



    return(
        <div>
        <h1>Top Tracks </h1>
        {tracks && tracks.length ? (
          <StyledTrackList>
            {tracks.map((track, idx) => (
              <li className="track_item" key={idx}>
                <div className="track_number">{idx + 1}</div>
                <div className="track_title">
                  {track.album.images.length && track.album.images[2] && (
                    <div className="track_image">
                      <img src={track.album.images[2].url} alt={track.name} />
                    </div>
                  )}
                  <div className="track_name_artist">
                    <div className="track_name">
                      {track.name}
                    </div>
                    <div className="track_artist">
                      {track.artists.map((artist, idx) => (
                        <span key={idx}>
                          {artist.name}{idx !== track.artists.length - 1 && ', '}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="track_album">
                  {track.album.name}
                </div>
                <div className="track_length">
                  {formatDuration(track.duration_ms)}
                </div>
              </li>
            ))}
          </StyledTrackList>
        ) : (
          <p className="empty">No tracks available</p>
        )}
      </div>
    );
        }    