const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const querystring = require('querystring');


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

app.get('/login', (req,res) => {
    //Setting cookie with spotify state from random string

    const state = generateRandomString(16)
    res.cookie(spotifyState, state);

    const scope = 'user-read-private user-read-email';

    const queryParams = querystring.stringify({
    client_id: CLIENT_ID,
    response_type: 'code',
    redirect_uri: REDIRECT_URI,
    state: state,
    scope: scope
})

    res.redirect(`https://accounts.spotify.com/authorize?${queryParams}`);
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