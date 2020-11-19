import { faMusic } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'



const  Nav=({librarystatus,setlibrarystatus})=> {
    return (
        <nav>
            <h1>Waves</h1>
            <button onClick={()=>setlibrarystatus(!librarystatus)}>Libary
                <FontAwesomeIcon icon={faMusic}/>
            </button>
        </nav>
    )
}

export default Nav
