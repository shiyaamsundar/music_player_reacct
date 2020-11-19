import React from 'react'
import LibrarySongs from './LibrarySongs'

const Library=({songs,setcurrentsong,audioRef,isplaying,setsongs,librarystatus})=> {
    return (
        <div className={`library ${librarystatus ?'active-library':''}`}>
            <h2>Library</h2>
            <div className="library-songs">
            
            {songs.map(song=> <LibrarySongs setsongs={setsongs} isplaying={isplaying} song={song} audioRef={audioRef} id={song.id}  key={song.id} songs={songs} setcurrentsong={setcurrentsong}/> )}

            </div>
        </div>
    )
}

export default Library
