import axios from "axios";


const LOCALSTORAGE_KEYS = {
    accessToken: 'spotify_access_token',
    refreshToken: 'spotify_refresh_token',
    expireTime: 'spotify_token_expire_time',
    timestamp: 'spotify_token_timestamp'
};

const LOCALSTORAGE_VALUES = {
    accessToken: window.localStorage.getItem(LOCALSTORAGE_KEYS.accessToken),
    refreshToken: window.localStorage.getItem(LOCALSTORAGE_KEYS.refreshToken),
    expireTime: window.localStorage.getItem(LOCALSTORAGE_KEYS.expireTime),
    timestamp: window.localStorage.getItem(LOCALSTORAGE_KEYS.timestamp)
};







function expiredToken() {
    const {accessToken, timestamp, expireTime} = LOCALSTORAGE_VALUES;
    if (!accessToken || !timestamp){
        return false;
    }
    const timeElapsed = Date.now() - Number(timestamp);
    return (timeElapsed / 1000) > Number(expireTime);
}

export const spotifyLogOut = () => {
    //Loops through local storage values and clears them on logout
    for (const property in LOCALSTORAGE_KEYS) {
        window.localStorage.removeItem(LOCALSTORAGE_KEYS[property]);
    }
    //Returns homepage 
    window.location = window.location.origin;
};

async function refreshToken(){

    //If there is no refresh token in local storage log out of spotify 
    try {
        if(!LOCALSTORAGE_VALUES.refreshToken || LOCALSTORAGE_VALUES.refreshToken === 'undefined' || (Date.now() - Number(LOCALSTORAGE_VALUES.timestamp) / 1000) < 1000) {
            console.error('Unable to refresh token');
            spotifyLogOut()
        }

        //Call /refresh_token

        const {data} = await axios.get(`/refresh_token?refresh_token=${LOCALSTORAGE_VALUES.refreshToken}`);

        //Update values stored in local storage 

        window.localStorage.setItem(LOCALSTORAGE_KEYS.accessToken, data.accessToken);
        window.localStorage.setItem(LOCALSTORAGE_KEYS.timestamp, Date.now());

        //Reload the page after local storage values are updated

        window.location.reload();
    } catch(err) {
        console.error(err);
    }
};








//Gets Spotify access token from URL or Local Storage
function SpotifyAccessToken () {
   
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString);

    const queryParams = {
        [LOCALSTORAGE_KEYS.accessToken]: urlParams.get('access_token'),
        [LOCALSTORAGE_KEYS.refreshToken]: urlParams.get('refresh_token'),
        [LOCALSTORAGE_KEYS.expireTime]: urlParams.get('expires_in') 
    };

    const spotifyError = urlParams.get('error');
    
    //If there is an error or if the token is expired refresh the token 

    if (spotifyError || expiredToken() || LOCALSTORAGE_VALUES.accessToken === 'undefined'){
    refreshToken();
}

    // If there is a valid token, return the token
    if (LOCALSTORAGE_VALUES.accessToken && LOCALSTORAGE_VALUES.accessToken !== 'undefined') {
return LOCALSTORAGE_VALUES.accessToken;
}

    //If token is in the URL store the token in local storage 
    if (queryParams[LOCALSTORAGE_KEYS.accessToken]) {
        for(const property in queryParams) {
            window.localStorage.setItem(property, queryParams[property]);
        }
        //Set timestamp in local storage 
        window.localStorage.setItem(LOCALSTORAGE_KEYS.timestamp, Date.now());
        return queryParams[LOCALSTORAGE_KEYS.accessToken];
    }

    return false;

};



export const accessToken = SpotifyAccessToken()


//Globally define AXIOS defaults 

axios.defaults.baseURL = 'https://api.spotify.com/v1';
axios.defaults.headers['Authorization'] = `Bearer ${accessToken}`;
axios.defaults.headers['Content-Type'] = 'application/json';

//Return logged in users profile 

export const spotifyProfile = () => axios.get('/me');


//Return logged in user Playlist 

export const spotifyPlaylists = (limit = 20) => {
    return axios.get(`/me/playlists?limit=${limit}`);
}


//Return user Top Artisits Data

export const spotifyTopArtists = (time_range = 'short_term') => {
    return axios.get(`/me/top/artists?time_range=${time_range}`);
}


export const spotifyTopTracks = (time_range = 'short_term') => {
    return axios.get(`/me/top/tracks?time_range=${time_range}`);
};




