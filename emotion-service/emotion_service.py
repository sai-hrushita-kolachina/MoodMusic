from flask import Flask, request, jsonify
from flask_cors import CORS
import base64
import cv2
import numpy as np
from fer import FER

app = Flask(__name__)
CORS(app)

# Initialize the FER detector
detector = FER(mtcnn=True)

@app.route('/detect_emotion', methods=['POST'])
def detect_emotion():
    data = request.get_json()
    image_data = data.get('image')
    if not image_data:
        return jsonify({'error': 'No image provided'}), 400

    try:
        # Decode base64
        if ',' in image_data:
            header, encoded = image_data.split(',', 1)
        else:
            encoded = image_data

        img_bytes = base64.b64decode(encoded)
        img_array = np.frombuffer(img_bytes, dtype=np.uint8)
        frame = cv2.imdecode(img_array, cv2.IMREAD_COLOR)

        if frame is None:
            return jsonify({'error': 'Image decode failed'}), 400

        # Detect emotions
        top = detector.top_emotion(frame)  # returns (emotion, score)
        dominant = top[0] if top else "neutral"

        return jsonify({'emotion': dominant})
    except Exception as e:
        return jsonify({'error': 'analysis_failed', 'msg': str(e)}), 500

if __name__ == "__main__":
    import os
    port = int(os.environ.get("PORT", 5001)) 
    app.run(host='0.0.0.0', port=port)

