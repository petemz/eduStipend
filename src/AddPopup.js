import { useContext, useRef, useEffect } from "react";
import { Context } from "./Context"

const AddPopup = () => {
    const ref = useRef()
    const { playlists, setPlaylists, songToAdd, setSongToAdd, isPopupVisible, setIsPopupVisible } = useContext(Context)
    function handleAdd (playlist) {
        const updatedPlaylists = playlists.map(item => {
            if (item.id === playlist.id) {
              return { ...item, songs: [...item.songs, songToAdd] }
            }
            return item
          })
      
        setPlaylists(updatedPlaylists)
        setSongToAdd({})
        setIsPopupVisible(false)
    }

    useEffect(() => {
        const checkIfClickedOutside = (e) => {
          if (isPopupVisible && ref.current && !ref.current.contains(e.target)) {
            setIsPopupVisible(false)
          }
        }
    
        document.addEventListener("mousedown", checkIfClickedOutside)
    
        return () => {
          document.removeEventListener("mousedown", checkIfClickedOutside)
        }
      })

    return (
        <div 
            
            className="bg-black overflow-y-hidden bg-opacity-60 fixed top-0 w-full h-full flex justify-center items-center"
        >
            <div
                ref={ref}
                className="bg-white w-96 h-[600px] overflow-y-scroll px-2 py-5 text-2xl"
            >
                <h1 className="text-3xl text-center mb-8">Playlists</h1>
                {
                    playlists.map((playlist) => {
                        return(
                            <div 
                                className="h-16 px-4 bg-gray-700 border-2 border-orange-500 rounded-md text-white mb-3 cursor-pointer"
                                onClick={() => handleAdd(playlist)}
                                key={playlist.id}
                            >
                                <h2 className="text-xl">{playlist.name}</h2>
                                <p className="text-base">{`created by ${playlist.createdBy}`}</p>
                            </div>
                        )
                    }
                )}
            
                <button 
                    onClick={() => setIsPopupVisible(false)}
                    className="rounded-md block px-3 py-2 mx-auto mb-3 mt-12 bg-orange-500"
                >
                    <span>Cancel</span>
                </button>
            </div>
        </div> 
    )
}

export default AddPopup