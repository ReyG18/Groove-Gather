import { useEffect, useState } from 'react';
import axios from 'axios';
import { SPOTIFY_CONFIG } from '../utils/config';


const CLIENT_ID = SPOTIFY_CONFIG.CLIENT_ID;
const CLIENT_SECRET = SPOTIFY_CONFIG.CLIENT_SECRET;

function Music() {
  const [token, setToken] = useState('');
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await axios.post(
          'https://accounts.spotify.com/api/token',
          'grant_type=client_credentials',
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization': 'Basic ' + btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)
            }
          }
        );
        setToken(response.data.access_token);
      } catch (error) {
        console.error('Error fetching token:', error);
      }
    };

    fetchToken();
  }, []);

  useEffect(() => {
    if (token) {
      const fetchTracks = async () => {
        try {
          const response = await axios.get(
            'https://api.spotify.com/v1/playlists/37i9dQZF1DXcBWIGoYBM5M/tracks', // Example playlist ID
            {
              headers: {
                'Authorization': `Bearer ${token}`
              },
              params: {
                q: 'genre:"edm"',
                type: 'track',
                limit: 10
            }
            }
          );
          setTracks(response.data.items);
        } catch (error) {
          console.error('Error fetching tracks:', error);
        }
      };

      fetchTracks();
    }
  }, [token]);

  return (
    <div className="default-font md:h-full h-[80%]">
      <p className="text-xl md:text-2xl text-center">Top Songs Today</p>
      <div className="h-1/2 md:h-3/4 flex flex-col gap-2 overflow-auto hideScrollbar">
        {tracks.map((item, index) => {
          const track = item.track;
          return (
            <div key={index} className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <p className="rounded w-9 text-center p-2 bg-red-600 text-white">{index + 1}</p>
                <img src={track.album.images[0].url} alt={track.name} className="w-12 h-12 object-cover" />
                <div className="flex flex-col text-sm">
                  <p>{track.name}</p>
                  <p>{track.artists.map(artist => artist.name).join(', ')}</p>
                </div>
              </div>
              <div className="w-full h-[1px] bg-black/50"></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Music;
