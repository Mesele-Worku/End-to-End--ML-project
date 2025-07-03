from flask import Flask, request, jsonify
import joblib
from flask_cors import CORS
import numpy as np

app = Flask(__name__)
CORS(app)

# Load model and scaler
model = joblib.load('evangadi_best_diabetes_model.pkl')
scaler = joblib.load('evangadi_scaler.pkl')  

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    features = np.array([
        data['pregnancies'],
        data['glucose'],
        data['bloodPressure'],
        data['skinThickness'],
        data['insulin'],
        data['bmi'],
        data['diabetesPedigree'],
        data['age']
    ]).reshape(1, -1)

    # Scale the input features
    scaled_features = scaler.transform(features)

    # Make prediction
    prediction = model.predict(scaled_features)[0]

    return jsonify({'prediction': int(prediction)})

if __name__ == '__main__':
    app.run(port=5000, debug=True)
