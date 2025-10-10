import { getAccessToken } from './utils/spotifyClient.js';
(async () => {
  try {
    const api = await getAccessToken();
    const data = await api.searchTracks('happy', { limit: 1 });
    console.log(data.body.tracks.items[0].name);
  } catch (err) {
    console.error("Spotify API Error:", err);
  }
})();
