

export default function SearchResult({track, selectTrack}) {

    function playSong() {
        selectTrack(track)
    }

    return(
        <div 
        className='d-flex m-2 align-items-center' 
        style={{cursor: 'pointer'} }
        onClick={playSong}>
            <img src={track.albumUrl} style={{ height: '70px', width: '70px'}}/>
            <div>{track.title}</div>
            <div>{track.artist}</div>
        </div>
    )
}