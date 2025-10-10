import express from 'express';
import { getAccessToken } from '../utils/spotifyClient.js';

const router = express.Router();

// Map emotions to Spotify search queries
const emotionToQuery = {
  happy: 'happy',
  sad: 'acoustic',
  angry: 'rock',
  neutral: 'chill',
  fear: 'ambient',
  surprise: 'electronic',
  disgust: 'metal'
};

// GET /api/music/:emotion
router.get('/:emotion', async (req, res) => {
  try {
    const emotion = (req.params.emotion || 'neutral').toLowerCase();
    const query = emotionToQuery[emotion] || 'pop';

    // Get Spotify API client with access token
    const spotifyApi = await getAccessToken();

    // Test: check if access token is valid
    if (!spotifyApi.getAccessToken()) {
      throw new Error('Spotify access token is missing');
    }

    // Search tracks on Spotify
    const data = await spotifyApi.searchTracks(query, { limit: 12 });

    if (!data.body.tracks.items.length) {
      return res.status(404).json({ error: 'No tracks found for query', query });
    }

    // Format song data
    const songs = data.body.tracks.items.map((t) => ({
      id: t.id,
      name: t.name,
      artist: t.artists.map((a) => a.name).join(', '),
      preview_url: t.preview_url,
      spotify_url: t.external_urls.spotify
    }));

    res.json({ emotion, query, songs });
  } catch (err) {
    console.error('Spotify API Error:', err.message);
    res.status(500).json({
      error: 'Failed to fetch songs',
      details: err.message
    });
  }
});

export default router;
