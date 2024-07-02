import React from 'react'
import SpotifyPlayer from "react-spotify-web-playback"

export default function Player({access_token, trackuri}) {
  if(!access_token) return null
    return (
  <SpotifyPlayer 
     token={access_token}
     showSaveIcon
     uris={trackuri? [trackuri] : []}
  />
    )
}
