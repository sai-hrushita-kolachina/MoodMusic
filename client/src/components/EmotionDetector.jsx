import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import axios from "axios";

// Optional: define video constraints
const WEBCAM_VIDEO_CONSTRAINTS = {
  width: 320,
  height: 240,
  facingMode: "user",
};

export default function EmotionMusicApp() {
  const webcamRef = useRef(null);
  const [emotion, setEmotion] = useState("");
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);

  const captureAndDetect = async () => {
    setLoading(true);

    try {
      // 1) Capture image from webcam
      const imageSrc = webcamRef.current.getScreenshot();

      // 2) Send image to Flask emotion detection service
      const emotionRes = await axios.post(
        "http://localhost:5001/detect_emotion",
        { image: imageSrc }
      );
      const detected = emotionRes.data.emotion;
      setEmotion(detected);

      // 3) Request songs from Node backend
      const songsRes = await axios.get(
        ` http://localhost:5000/api/music/${detected}`
      );
      setSongs(songsRes.data.songs || songsRes.data);
    } catch (err) {
      console.error(err);
      alert(
        "Error detecting emotion or fetching songs. Check console and services."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Emotion-Based Music App</h1>

      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={WEBCAM_VIDEO_CONSTRAINTS}
        className="webcam"
      />

      <div className="flex gap-2 mt-4 justify-center">
        <button onClick={captureAndDetect} disabled={loading}>
          {loading ? "Detecting..." : "Detect Emotion & Recommend"}
        </button>
      </div>

      {emotion && (
        <p className="emotion-text">
          Detected emotion: <strong>{emotion}</strong>
        </p>
      )}

      <ul className="song-list">
        {songs && songs.length === 0 && (
          <li className="text-gray-500">No songs yet — press the button.</li>
        )}
        {songs.map((s, i) => (
          <li key={s.id || i}>
            <div>
              <div className="song-name">{s.name}</div>
              <div className="song-artist">{s.artist}</div>
            </div>
            <div>
              {s.preview_url ? (
                <audio controls src={s.preview_url} />
              ) : (
                <a href={s.spotify_url} target="_blank" rel="noreferrer">
                  Open
                </a>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
