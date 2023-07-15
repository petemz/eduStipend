import { createContext, useState, useEffect } from "react"
import { nanoid } from "nanoid";

const Context = createContext() 

function ContextProvider(props) {
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [songToAdd, setSongToAdd] = useState({})

    const handleAddClick = (song) =>{
        setIsPopupVisible(true)
        setSongToAdd(song)
    }

    const [playlists, setPlaylists] = useState(() => {
        const storedPlaylists = localStorage.getItem("playlists");
        return storedPlaylists ? JSON.parse(storedPlaylists) : getDefaultPlaylists();
    });

    useEffect(() => {
        localStorage.setItem("playlists", JSON.stringify(playlists));
    }, [playlists]);

    function getDefaultPlaylists() {
        return [
        {
            name: "Gospel",
            id: nanoid(),
            songs: [],
            createdBy: "Username",
        },
        {
            name: "Pop",
            id: nanoid(),
            songs: [],
            createdBy: "Username",
        },
        {
            name: "Afrobeats",
            id: nanoid(),
            songs: [],
            createdBy: "Username",
        },
        {
            name: "Reggae",
            id: nanoid(),
            songs: [],
            createdBy: "Username",
        },
        {
            name: "Blues",
            id: nanoid(),
            songs: [],
            createdBy: "Username",
        },
    ]}

    return (
        <Context.Provider value={{ 
            isPopupVisible, 
            setIsPopupVisible, 
            songToAdd, 
            handleAddClick, 
            playlists, 
            setPlaylists, 
            setSongToAdd}}
        >
            {props.children}
        </Context.Provider>
    )
}

export {ContextProvider, Context}