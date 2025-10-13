import os
from waitress import serve
from emotion_service import app

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5001))
    serve(app, host="0.0.0.0", port=port)