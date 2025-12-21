from fastapi import FastAPI, UploadFile, File
import shutil
import os
import torch

from model.model import load_model, DEVICE
from model.preprocess import preprocess_image

# ----------------------------
# App init
# ----------------------------
app = FastAPI(title="VeriMedia AI Service")

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

# ----------------------------
# Load model ONCE (IMPORTANT)
# ----------------------------
model = load_model()
model.eval()  # ✅ VERY IMPORTANT

# ----------------------------
# Routes
# ----------------------------
@app.post("/analyze")
async def analyze(file: UploadFile = File(...)):
    file_path = os.path.join(UPLOAD_DIR, file.filename)

    # Save uploaded file
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    try:
        # Preprocess
        image_tensor = preprocess_image(file_path, DEVICE)

        # Inference
        with torch.no_grad():
            outputs = model(image_tensor)
            probs = torch.softmax(outputs, dim=1)

        fake_prob = probs[0][1].item()
        real_prob = probs[0][0].item()

        trust_score = int((1 - fake_prob) * 100)

        return {
            "trustScore": trust_score,
            "prediction": "FAKE" if fake_prob > 0.5 else "REAL",
            "real_probability": round(real_prob * 100, 2),
            "fake_probability": round(fake_prob * 100, 2),
            "layers": [
                {
                    "name": "AI Deepfake Detection",
                    "status": "fail" if fake_prob > 0.5 else "pass",
                    "confidence": round(max(real_prob, fake_prob) * 100, 2)
                }
            ]
        }

    finally:
        # ✅ Cleanup file
        if os.path.exists(file_path):
            os.remove(file_path)
