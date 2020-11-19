import React from 'react'

const LibrarySongs=({song,setcurrentsong,songs,id,audioRef,isplaying,setsongs})=> {

    const songselecthandler=async ()=>{
        const selectedsong=songs.filter((state)=>state.id===id)
        await setcurrentsong(song)
        const newsongs=songs.map((song)=>{
            if(song.id===id){
                return {...song,active:true}
            }
            else{
                return {...song,active:false}
            }
        })

        setsongs(newsongs)



        if(isplaying)
        {
        // const promiseplay=audioRef.current.play()
        // if(promiseplay!==undefined){
        //     promiseplay.then((audio)=>{
        //         audioRef.current.play()
        //     })
        // }

        audioRef.current.play()
        }
    }

    return (
        <div onClick={songselecthandler} className={`library-song ${song.active?'selected':""}`}>
            <img alt={song.name} src={song.cover}></img>
            <div className="song-description"><h3>{song.name}</h3>

            <h4>{song.artist}</h4>
            </div>            
        </div>
    )
}

export default LibrarySongs
