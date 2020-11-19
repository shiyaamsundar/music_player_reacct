import { faPlay,faAngleLeft,faAngleRight,faPause } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React,{useRef,useState,useEffect} from 'react'


const  Player=({currentsong,isplaying,setisplaying,audioRef,songinfo,setsonginfo,songs,setcurrentsong,setsongs})=> {





const playsonghandler=()=>{

    if(isplaying)
    {
    audioRef.current.pause()
    setisplaying(!isplaying)
    }
    else{
        audioRef.current.play()
        setisplaying(!isplaying)
    }

}

    
const activelibraryhandler=(nextprev)=>{
    const newsongs=songs.map((song)=>{
        if(song.id===nextprev.id){
            return {...song,active:true}
        }
        else{
            return {...song,active:false}
        }
    })
    setsongs(newsongs)
}

    const gettime=(time)=>{
        return (Math.floor(time/60)+":"+('0'+Math.floor(time%60)).slice(-2)
        
        )
    }
    const draghandler=(e)=>{
        setsonginfo({...songinfo,currentTime:e.target.value})
        audioRef.current.currentTime=e.target.value
    }

    const skiptrackhandler=(direction)=>{
        let currentidx=songs.findIndex((song)=>song.id===currentsong.id)
        if(direction==='skip-forward'){
            setcurrentsong(songs[(currentidx+1)%songs.length])
            activelibraryhandler(songs[(currentidx+1)%songs.length])
            
            
        }
        else{
            if((currentidx-1)%songs.length===-1)
            {
                setcurrentsong(songs[songs.length-1])
                activelibraryhandler(songs[songs.length-1])
                if(isplaying)
                {
        const promiseplay=audioRef.current.play()
        if(promiseplay!==undefined){
            promiseplay.then((audio)=>{
                audioRef.current.play()
            })
        }
                }
                return
            }
            setcurrentsong(songs[(currentidx-1)%songs.length])
            activelibraryhandler(songs[(currentidx-1)%songs.length])
        
        }
        if(isplaying)
        {
                const promiseplay=audioRef.current.play()
        if(promiseplay!==undefined){
            promiseplay.then((audio)=>{
                audioRef.current.play()
                
            })
        }
        }

 
    }

    return (
        <div className="player">
            <div className="time-control">
    <p>{gettime(songinfo.currentTime)}</p>
    
            <input min={0} max={songinfo.duration || 0} onChange={draghandler} value={songinfo.currentTime} type="range"/>
            <p>{gettime(songinfo.duration)}</p>
            </div>
            <div className="play-control">
            <FontAwesomeIcon onClick={()=>skiptrackhandler('skip-back')} className="skip-back" size="2x" icon={faAngleLeft}/>
            <FontAwesomeIcon onClick={playsonghandler} className="play" size="2x" icon={isplaying?faPause:faPlay}/>
            <FontAwesomeIcon className="skip-forward" onClick={()=>skiptrackhandler('skip-forward')} size="2x" icon={faAngleRight}/>
            </div>
  
        </div>
    )
}

export default Player
