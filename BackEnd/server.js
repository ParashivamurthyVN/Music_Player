import SpotifyWebApi from "spotify-web-api-node";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
// @ts-ignore
import lyricsFinder from 'lyrics-finder';


const app = express();
const port = 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());
app.use(cors());

app.post('/login', (req, res)=> {
const code=req.body.code;

const SpotifyApi = new SpotifyWebApi({
  redirectUri:'http://localhost:3000',
  clientId:'022f96ff220b410585b26556a6f088cf',
  clientSecret:'c69897a9018f49bfb3cfbc119673f419',
})

SpotifyApi.authorizationCodeGrant(code).then(data =>{
    res.json({
    expiresIn: data.body.expires_in,
    accessToken: data.body.access_token,
    refreshToken:data.body.refresh_token,
}) 
}).catch((err)=>{
    console.log(err);
 res.sendStatus(400)
})

});

app.post('/refresh', (req, res)=> {
  const refreshToken=req.body.refreshToken;

  const SpotifyApi = new SpotifyWebApi({
    redirectUri:'http://localhost:3000',
    clientId:'022f96ff220b410585b26556a6f088cf',
    clientSecret:'c69897a9018f49bfb3cfbc119673f419',
    refreshToken
  })

  SpotifyApi.refreshAccessToken().then(
    (data)=>{
     res.json({
      expiresIn: data.body.expires_in,
      accessToken: data.body.access_token
  }) 
    }
  ).catch((err)=>{
    console.log(err);
 res.sendStatus(400)
})
})

app.get('/lyrics', async (req, res)=>{
  
const lyrics = (await lyricsFinder(req.query.artist, req.query.track)) || "No Lyrics Found"
// console.log(lyrics);
res.json({lyrics})
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  })
