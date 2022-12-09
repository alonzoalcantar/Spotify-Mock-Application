

export default function SearchResult({track}) {
    return(
        <div className='d-flex m-2 align-items-center'>
            <img src={track.albumUrl} style={{ height: '60px', width: '64px'}}/>
            <div>{track.title}</div>
            <div>{track.artist}</div>
        </div>
    )
}