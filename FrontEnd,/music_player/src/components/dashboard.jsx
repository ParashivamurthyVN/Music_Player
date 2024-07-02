import React from "react";
import useAuth from "./useAuth";
import { useState, useEffect} from "react";
import SpotifyWebApi from "spotify-web-api-node";
import TrackList from "./TrackList";
import Player from "./player";
import Lyrics from "./lyrics";
import axios from 'axios';

const SpotifyApi = new SpotifyWebApi({
  clientId:'022f96ff220b410585b26556a6f088cf',
  
})



function Dashboard({code}){

    const access_token= useAuth(code);
    const [search, setSearch]= useState("");
    const [searchResults, setSearchResults]= useState([]);
    const [playingTrack, setplayingTrack]= useState();
    const [lyrics, setLyrics]= useState("");

    console.log(searchResults);

  async function playTrack(track) {
    setplayingTrack(track)
    setSearch("")
    setLyrics("")
  }

  useEffect(()=>{
    if(!access_token) return
    SpotifyApi.setAccessToken(access_token)
  },[access_token])


async function Search(event){
  event.preventDefault();
  SpotifyApi.searchTracks(search).then(res =>{

   setSearchResults(res.body.tracks.items.map(track=>{
      return {
        artist:track.artists[0].name,
        title:track.name,
        uri:track.uri,
        albumUri:track.album.images[2].url
      }
    }))
  })
}

// function getLyrics(playingTrack) {
//   if(!playingTrack) return
//   axios.get('http://localhost:3001/lyrics',{
//     params:{
//       track:playingTrack.title,
//       artist:playingTrack.artist,
//     },
//     }).then(res=>{
//       setLyrics(res.data.lyrics);
//     })
// }

useEffect(() => {
if(!playingTrack) return
  axios.get('http://localhost:3001/lyrics',{
  params:{
    track:playingTrack.title,
    artist:playingTrack.artist,
  },
  }).then(res=>{
    setLyrics(res.data.lyrics);
  })
  },[playingTrack])

return(
    <div>
    <form  name="searchName" className="search" onSubmit={Search} >
        <input className="search__input" type="text" placeholder="Search for song " onChange={e=>setSearch(e.target.value) }></input>
        <button type="submit" className="search__button"><svg aria-hidden="true" className="search__icon" viewBox="0 0 24 24">
            <g>
                <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
            </g>
        </svg>
        </button>
       </form>
       <div className="bodyDiv">
       <div className="trackDiv" >
         {searchResults.map(track=>(
          <TrackList song={track} key={track.uri} playTrack={playTrack}/>
         ))}
         <Player access_token={access_token} trackuri={playingTrack?.uri} />
       </div>
        <Lyrics lyrics={lyrics}/>
       </div>
      </div>
);
}

export default Dashboard;