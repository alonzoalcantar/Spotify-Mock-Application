const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const querystring = require('querystring');
const axios = require('axios');
const lyricsFinder = require('lyrics-finder');
const bodyParser = require('body-parser');




require('dotenv').config();
// Connect to db after the dotenv above
require('./config/database');

const app = express();

//Spotify OAuth

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;



app.use(logger('dev'));
app.use(express.json());
app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


app.use(require('./config/checkToken'));

// Put all API routes here (before the catch-all)


app.use('/api/users', require('./routes/api/users'));

//Spotify Log In Route


//Creates Random String 
const generateRandomString = length => {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for(let i = 0; i < length; i++){
        text+= possible.charAt(Math.floor(Math.random()* possible.length))
}
return text
};

const spotifyState = 'spotify_auth_state';

//Request Authorization

app.get('/login2spotify', (req,res) => {
    //Setting cookie with spotify state from random string

    const state = generateRandomString(16)
    res.cookie(spotifyState, state);

    const scope = [
    'user-read-private',
    'user-read-email',
    'user-top-read',
    'user-read-playback-state',
    'user-library-read',
    'user-modify-playback-state',
    'streaming'
    ].join(' ')

    const queryParams = querystring.stringify({
    client_id: CLIENT_ID,
    response_type: 'code',
    redirect_uri: REDIRECT_URI,
    state: state,
    scope: scope
})

    res.redirect(`https://accounts.spotify.com/authorize?${queryParams}`);
})

//Use Authcode to request access token

app.get('/callback', (req,res) => {
    
    //code is the value of the authorization code 
    const code = req.query.code || null ;

    axios({
        
        method: 'POST',
        url: 'https://accounts.spotify.com/api/token',
        data: querystring.stringify({
            grant_type: 'authorization_code',
            code: code ,
            redirect_uri: REDIRECT_URI
        }),

        headers: {
            'Content-Type' : 'application/x-www-form-urlencoded',
            Authorization: `Basic ${new Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
        },
    })
    //AXIOS is promise based, chain a then and a catch to handle resolving the returned promise 
    .then(response => {
        if (response.status === 200) {

            const {access_token, refresh_token,  expires_in} = response.data;

            const queryParams = querystring.stringify({
                access_token,
                refresh_token, 
                expires_in
            })

            // Redirect to REACT APP

            res.redirect(`http://localhost:3000/?${queryParams}`)
    } else {
        res.redirect(`/?${querystring.stringify({ error: 'invalid_token'})}`);
    }
})
    .catch(error => {
        res.send(error);
    });

})

//Refresh Authorizatrion token once current session token expires
app.get('/refresh_token',(req,res) => {
    const {refresh_token} = req.query;


    axios({
        method: 'POST',
        url: 'https://accounts.spotify.com/api/token',
        data: querystring.stringify({
            grant_type: 'refresh_token',
            refresh_token: refresh_token
        }),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${new Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
        },
    })
    .then(response => {
        res.send(response.data);
    })
    .catch(error => {
        res.send(error);
    });
} );


app.get('/lyrics', async(req,res) => {
    const lyrics = await lyricsFinder(req.query.artist, req.query.track) || 'No Lyrics Can Be Found'
    res.json({lyrics})
})


// "catch-all" route that will match all GET requests
// that don't match an API route defined above



app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});



const port = process.env.PORT || 3001;

app.listen(port, function() {
  console.log(`Express app running on port ${port}`);
});