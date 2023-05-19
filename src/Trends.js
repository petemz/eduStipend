import { useEffect, useState, useContext } from "react";
import { Context } from "./Context"

const Trends = () => {
    const { handleAddClick } = useContext(Context)
    const [songs, setSongs] = useState([])

    useEffect(() => {
        const fetchTrendingSongs = async () => {
          try {
            const clientId = '76619eaae4714118b52d252196b635db'
            const clientSecret = '189bd5ab67f249dbb869d6a77917cae1'
    
            const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: 'Basic ' + btoa(clientId + ':' + clientSecret),
              },
              body: 'grant_type=client_credentials',
            });
    
            if (tokenResponse.ok) {
              const tokenData = await tokenResponse.json()
              const accessToken = tokenData.access_token
    
              // Make an API call to fetch currently trending songs
              const response = await fetch('https://api.spotify.com/v1/playlists/37i9dQZEVXbMDoHDwVN2tF/tracks?limit=7', {
                headers: {
                  Authorization: 'Bearer ' + accessToken,
                },
              })
    
              if (response.ok) {
                const data = await response.json()
                const tracks = data?.items || []
                setSongs(tracks)
              } else {
                console.log('Error:', response.status);
              }
            } else {
              console.log('Error:', tokenResponse.status);
            }
          } catch (error) {
            console.log('Error:', error);
          }
        };
    
        fetchTrendingSongs();
    }, []);

    return (
        <div className="w-[430px] p-5 text-xl h-full flex flex-col items-center bg-gray-500">
            <h2 className="mb-5 font-semibold">Trending Songs</h2>

            <div className="w-full mb-4">
                {songs.map((song, index) => {
                    return (
                    <div className="bg-white h-14 mb-4 rounded-md flex justify-between items-center px-4" key={index}>
                        <span className=" line-clamp-1">{song.track.name}
                            <em className="text-orange-500">{` by ${song.track.artists[0].name} `}</em>
                        </span>
                        <button onClick={() => handleAddClick(song)}>
                            <svg width={20} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/></svg>
                        </button> 
                    </div>
                    )}
                )}  
            </div>

            <button className="rounded-md px-3 py-2 mx-auto bg-orange-500">
                <span>View more</span>
            </button>
        </div>
    )
}

export default Trends