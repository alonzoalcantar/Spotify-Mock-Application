import { useEffect } from "react";


export default function SpotifyLogInForm() {

    useEffect(() => {
        const queryString = window.location.search
        const urlParams = new URLSearchParams(queryString);
        const accessToken = urlParams.get('access_token');
        const refreshToken = urlParams.get('refresh_token');
        console.log(accessToken)
        console.log(queryString)
        console.log(refreshToken);
     

        // if(refreshToken) {
        //     fetch(`/refresh_token?refresh_token=${refreshToken}`)
        //     .then(res => res.json())
        //     .then(data => console.log(data))
        //     .catch(err => console(err));
        // }
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