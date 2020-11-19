import React,{useState,useRef} from 'react'
import Player from './components/Player';
import Song from './components/Songs';
import './styles/app.scss'
import data from './data'
import Library from './components/Library';
import Nav from './components/Nav';



function App() {

  
  const [librarystatus,setlibrarystatus]=useState(false)
  const [songs,setsongs]=useState(data())
  const [currsong,setcurrsong]=useState(songs[0])
  const [isplaying,setisplaying]=useState(false)
  const audioRef=useRef(null)
  const [songinfo,setsonginfo]=useState({
    currentTime:0,
    duration:0
})

  const timeupdatehandler=(e)=>{
    const current=e.target.currentTime
    const dur=e.target.duration
    setsonginfo({...songinfo,currentTime:current,duration:dur})
}
  const songhandler=async()=>{
    let currentidx=songs.findIndex((song)=>song.id===currsong.id)
    await setcurrsong(songs[(currentidx+1)%songs.length])
    if(isplaying)
    audioRef.current.play()
  }

  return (
    <div className={`App ${librarystatus? 'library-active':''}`}>
      <Nav librarystatus={librarystatus} setlibrarystatus={setlibrarystatus}/>
      <Song currentsong={currsong}/>
      <Player  setsongs={setsongs} songs={songs} setcurrentsong={setcurrsong} songinfo={songinfo} setsonginfo={setsonginfo} audioRef={audioRef} setisplaying={setisplaying} isplaying={isplaying}   currentsong={currsong}/>
      <Library librarystatus={librarystatus} setsongs={setsongs} isplaying={isplaying} audioRef={audioRef} songs={songs} setcurrentsong={setcurrsong}/>
      <audio  onEnded={songhandler} onLoadedMetadata={timeupdatehandler } onTimeUpdate={timeupdatehandler}  ref={audioRef} src={currsong.audio}></audio>
    </div>
  );
}

export default App;
