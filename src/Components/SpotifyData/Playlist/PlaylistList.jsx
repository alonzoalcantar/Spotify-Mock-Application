import { StyledList } from "../TopArtist/StyledList";
import { Link } from "react-router-dom";

export default function PlaylistList ({playlists}) {
    return(
        <div>
            {playlists && playlists.length ? (
            <StyledList>
                {playlists.map((playlist, idx) => (
                <li className="list_item" key={idx}>
                    <Link className="inner_list_item" to={`/playlists/${playlist.id}`}>
                        {playlist.images.length && playlist.images[0] && (
                        <div className="list_item_image">
                            <img src={playlist.images[0].url} alt={playlist.name} />
                        </div>
                        )}

                        <h3 className="list_item_name">{playlist.name}</h3>
                        <p className="list_item_lable">Playlist</p>

                    </Link>
                </li>
                ))}
            </StyledList>
            ) : (
            <p className="empty">No playlists available</p>
            )}
        </div>
    );
}