# 🎵 MoodMusic

MoodMusic is an emotion-based music recommendation web platform that detects a user's facial emotion through their webcam and recommends music based on their detected mood.

## ✨ Features

- 📷 Webcam-based facial emotion detection
- 🧠 AI-powered emotion analysis
- 😊 Detects emotions such as:
  - Happy
  - Sad
  - Angry
  - Neutral
  - Fear
  - Surprise
  - Disgust
- 🎵 Personalized music recommendations
- 🎧 Spotify API integration
- ⚛️ React-based frontend
- 🚀 Node.js and Express backend
- 🐍 Python Flask emotion detection service

---

## 🏗️ Project Architecture

```text
User
  │
  ▼
React Frontend
  │
  ├── 📷 Capture Image from Webcam
  │
  ▼
Python Emotion Detection Service
  │
  ▼
Detected Emotion
  │
  ▼
Node.js / Express Backend
  │
  ▼
Spotify API
  │
  ▼
🎵 Music Recommendations
```

---

## 📁 Project Structure

```text
MoodMusic/
│
├── client/                 # React Frontend
│   ├── public/
│   └── src/
│
├── backend/                # Node.js + Express Backend
│   ├── routes/
│   ├── utils/
│   └── server.js
│
├── emotion-service/        # Python Emotion Detection Service
│   ├── fer_patch/
│   ├── emotion_service.py
│   ├── run_server.py
│   └── requirements.txt
│
├── render.yaml
└── package.json
```

---

## 🛠️ Tech Stack

### Frontend

- React
- React Webcam
- Axios
- HTML
- CSS

### Backend

- Node.js
- Express.js
- Spotify Web API
- Axios
- CORS

### AI / Emotion Detection

- Python
- Flask
- OpenCV
- TensorFlow
- FER
- MTCNN

---

# 🚀 Getting Started

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/sai-hrushita-kolachina/MoodMusic.git
```

Navigate to the project:

```bash
cd MoodMusic
```

---

# 💻 Frontend Setup

Navigate to the client folder:

```bash
cd client
```

Install dependencies:

```bash
npm install
```

Start the frontend:

```bash
npm start
```

The application will run on:

```text
http://localhost:3000
```

---

# ⚙️ Backend Setup

Open another terminal and navigate to:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file and add your Spotify API credentials:

```env
SPOTIFY_CLIENT_ID=your_client_id
SPOTIFY_CLIENT_SECRET=your_client_secret
```

Start the backend:

```bash
npm start
```

The backend will run on:

```text
http://localhost:5000
```

---

# 🧠 Emotion Detection Service Setup

Open another terminal and navigate to:

```bash
cd emotion-service
```

Create and activate a virtual environment:

### Windows

```bash
python -m venv venv
venv\Scripts\activate
```

Install the required Python packages:

```bash
pip install -r requirements.txt
```

Run the emotion detection service:

```bash
python emotion_service.py
```

The service will run on:

```text
http://localhost:5001
```

---

# 🎵 How It Works

1. The user opens the MoodMusic website.
2. The user allows webcam access.
3. The webcam captures an image.
4. The image is sent to the Python emotion detection service.
5. The AI model analyzes the facial expression.
6. The dominant emotion is detected.
7. The detected emotion is sent to the backend.
8. The backend maps the emotion to a music category.
9. The Spotify API searches for relevant tracks.
10. Music recommendations are displayed to the user.

---

## 🎭 Emotion to Music Mapping

| Detected Emotion | Music Style |
|-----------------|-------------|
| 😊 Happy | Happy Music |
| 😢 Sad | Acoustic Music |
| 😡 Angry | Rock Music |
| 😐 Neutral | Chill Music |
| 😨 Fear | Ambient Music |
| 😲 Surprise | Electronic Music |
| 🤢 Disgust | Metal Music |

---

## 🔌 API Endpoints

### Emotion Detection Service

#### Detect Emotion

```text
POST /detect_emotion
```

The API receives an image and returns the detected emotion.

Example response:

```json
{
  "emotion": "happy"
}
```

---

### Music Recommendation API

#### Get Music Recommendations

```text
GET /api/music/:emotion
```

Example:

```text
GET /api/music/happy
```

Example response:

```json
{
  "emotion": "happy",
  "query": "happy",
  "songs": []
}
```

---

## 🔐 Environment Variables

The backend requires Spotify API credentials.

Create a `.env` file inside the `backend` folder:

```env
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
```

⚠️ Never upload your `.env` file or API credentials to GitHub.

---

## 🔮 Future Improvements

- 🎵 Improve music personalization
- 🤖 Support additional emotion detection models
- 📊 Add emotion history and analytics
- ❤️ Allow users to save favorite songs
- 🔐 Add user authentication
- 🎨 Improve UI and user experience
- 📱 Make the website fully responsive

---

## 👩‍💻 Author

**Sai Hrushita Kolachina**

GitHub: https://github.com/sai-hrushita-kolachina

---

## ⭐ Support

If you like this project, consider giving it a ⭐ on GitHub!

---

**Made with ❤️, AI, and Music 🎵**
