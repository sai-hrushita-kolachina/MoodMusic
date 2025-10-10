import SpotifyWebApi from 'spotify-web-api-node';

const spotifyApi = new SpotifyWebApi({
  clientId: 'e09b79f1f3f34246991e0a8b0a6e6177',   // wrap in quotes
  clientSecret: '7903844d826d4c988d890e8c5a00364d', // wrap in quotes
});

export const getAccessToken = async () => {
  try {
    const data = await spotifyApi.clientCredentialsGrant();
    spotifyApi.setAccessToken(data.body.access_token);
    return spotifyApi;
  } catch (err) {
    console.error('Error retrieving access token', err);
  }
};

export default spotifyApi;
