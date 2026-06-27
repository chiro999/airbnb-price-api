from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd
import numpy as np

app = Flask(__name__)
CORS(app)

model = joblib.load("airbnb_price_model.joblib")

@app.route("/")
def home():
    return jsonify({"message": "Airbnb price prediction API is running"})

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    input_df = pd.DataFrame([data])

    log_prediction = model.predict(input_df)[0]
    prediction = np.expm1(log_prediction)

    return jsonify({"predicted_price": round(float(prediction), 2)})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080)