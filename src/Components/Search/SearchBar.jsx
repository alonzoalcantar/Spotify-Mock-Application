
import { Container, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import { accessToken } from "../../Spotify/Spotify";

export default function Searchbar(){

const CLIENT_ID = process.env.CLIENT_ID;
    

console.log(CLIENT_ID)

    const [search , setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    useEffect(() => {
        if(!search) return setSearchResults([])
        if(!accessToken) return 
    },[search, accessToken])


    return(

            <Container className="d-flex flex-column py-2" style={{height: '100vh' }}>
            <Form.Control type='search'
            placeholder='Search Songs / Artist'
            value = {search}
            onChange = {event => setSearch(event.target.value)}/>
            <div className='= flex-frow-1 my-2' style = {{overflowY: 'auto'}}>
                Songs
            </div>
            <div>Bottom</div>
            </Container>

    )
}