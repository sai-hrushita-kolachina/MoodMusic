from flask import Flask, request, jsonify
from flask_cors import CORS
import base64, cv2, numpy as np

# --- lazy import handles heavy stuff only when needed ---
# don't import fer/tensorflow at module import time
detector = None

def get_detector():
    global detector
    if detector is None:
        # import FER only when first used (after server is already listening)
        from fer_patch import FER
        detector = FER(mtcnn=True)  # keep your Option A accuracy
    return detector

app = Flask(__name__)
CORS(app)
app.config['MAX_CONTENT_LENGTH'] = 8 * 1024 * 1024  # 8 MB

# ultra-fast health checks (no model load)
@app.get("/")
def root():
    return jsonify({"status": "ok"})

@app.get("/healthz")
def healthz():
    return jsonify({"status": "ok"})

@app.post("/detect_emotion")
def detect_emotion():
    data = request.get_json(silent=True) or {}
    image_data = data.get('image')
    if not image_data:
        return jsonify({'error': 'No image provided'}), 400
    try:
        encoded = image_data.split(',', 1)[1] if ',' in image_data else image_data
        img_bytes = base64.b64decode(encoded)
        frame = cv2.imdecode(np.frombuffer(img_bytes, np.uint8), cv2.IMREAD_COLOR)
        if frame is None:
            return jsonify({'error': 'Image decode failed'}), 400

        det = get_detector()
        top = det.top_emotion(frame)
        dominant = top[0] if top else "neutral"

        return jsonify({'emotion': dominant})
    except Exception as e:
        print("Exception occurred:", e)
        import traceback
        traceback.print_exc()   # <-- prints the full Python traceback
        return jsonify({'error': 'analysis_failed', 'msg': str(e)}), 500

if __name__ == "__main__":
    import os
    port = int(os.environ.get("PORT", 5001))
    app.run(host='0.0.0.0', port=port)