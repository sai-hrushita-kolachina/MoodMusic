import React from "react";
import EmotionDetector from "./components/EmotionDetector";
import "./App.css";

export default function App() {
  return (
    <div className="relative min-h-screen">
      {/* Flying music notes background */}
      <div className="music-background">
        {Array.from({ length: 15 }).map((_, i) => (
          <span key={i} className="note">🎵</span>
        ))}
      </div>

      {/* Main two-column layout */}
      <div className="flex justify-center items-start min-h-screen relative z-10 p-6 gap-8">
        {/* Left: Emotion Detector */}
        <div className="left-column">
          <EmotionDetector />
        </div>

        {/* Right: Song list placeholder */}
        <div className="right-column">
          <h2 className="songs-title">Recommended Songs</h2>
          <ul className="song-list">
            {/* The songs will populate here via EmotionDetector */}
            {/* You can optionally pass songs as props from EmotionDetector */}
          </ul>
        </div>
      </div>
    </div>
  );
}
