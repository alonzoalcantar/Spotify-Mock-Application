import { useEffect } from "react";


export default function SpotifyLogInForm() {

    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const accessToken = urlParams.get('access_token');
        const refreshToken = urlParams.get('refresh_token');
        console.log(accessToken);
        console.log(refreshToken);
      }, []);



    return (
        <div>
        <h1>Spotify Log In</h1>
        <a
        href='http://localhost:3001/login2spotify' >
            Log In to Spotify
        </a>
        </div>
    )
}