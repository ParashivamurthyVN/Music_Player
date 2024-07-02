import React from 'react'

export default function TrackList(props) {

    async function Play(){
      // console.log(props.song);
     props.playTrack(props.song)
    }

  return (
    <div className='songDiv' onClick={Play}>
     <img src={props.song.albumUri} alt='songCover'/>
     <div className='detailsDiv' >
      <span className='titleSpan'>{props.song.title}</span>
      <span className='artistSpan'>{props.song.artist}</span> 
     </div>
    </div>
  )
}
