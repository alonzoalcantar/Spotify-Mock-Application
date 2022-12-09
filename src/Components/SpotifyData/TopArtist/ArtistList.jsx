
import { StyledList } from "./topartiststyle";

export default function ArtistList({artists}) {



    return(

        <div>
        <h1>Top Artists</h1>


        {artists && artists.length ? (
            <StyledList type= 'artist'>
                {artists.map((artist, idx) => (
                    <li className='list_item' key={idx}>
                        <div className='inner_list_item'>
                            {artist.images[0] && (
                                <div className = 'list_item_image'>
                                    <img src={artist.images[0].url} alt= {artist.name}/>
                                </div>
                            )}
                            <h3 className='list_item_name'> {artist.name}</h3>
                            <p className='list_item_label'>Artist</p>
                        </div>
                    </li>
                ))}
            </StyledList>
        ): (
            <p className='empty_list'>No Artist Data Available</p>
        )} 

        </div>




    )
}