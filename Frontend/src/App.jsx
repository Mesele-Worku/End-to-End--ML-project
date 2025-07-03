import React, { useState } from "react";
import axios from "axios";
import "./App.css";
// import diabetesImage from "./assets/diabetes.png";
import diabetesImage from "./assets/image3.png";
// import diabetesImage from "./assets/image4.png";

function App() {
  const [formData, setFormData] = useState({
    pregnancies: "",
    glucose: "",
    bloodPressure: "",
    skinThickness: "",
    insulin: "",
    bmi: "",
    diabetesPedigree: "",
    age: "",
  });

  const [prediction, setPrediction] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const numericData = Object.fromEntries(
        Object.entries(formData).map(([key, value]) => [key, parseFloat(value)])
      );
      const res = await axios.post(
        "http://localhost:3001/api/predict",
        numericData
      );
      setPrediction(res.data.prediction === 1 ? "Diabetic" : "Not Diabetic");
    } catch (error) {
      console.error("Prediction error:", error);
    }
  };

  return (
    <div className="app-wrapper">
      <div className="image-side">
        <h2 className="evangadi">Evangadi Health Consultancy</h2>
        <img src={diabetesImage} alt="Diabetes Awareness" />
      </div>

      <div className="form-side">
        <h1 className="title">🧬Diabetes Prediction</h1>
        <form onSubmit={handleSubmit} className="form">
          {Object.entries(formData).map(([field, value]) => (
            <div className="form-group" key={field}>
              <label className="label">
                {field
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^./, (s) => s.toUpperCase())}
              </label>
              <input
                type="number"
                name={field}
                step={
                  field === "bmi"
                    ? "0.1"
                    : field === "diabetesPedigree"
                    ? "0.01"
                    : "1"
                }
                value={value}
                onChange={handleChange}
                className="input"
                required
              />
            </div>
          ))}
          <button type="submit" className="button">
            Predict
          </button>
        </form>
        {prediction && (
          <div className="result">
            🩺 Result: <strong>{prediction}</strong>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
