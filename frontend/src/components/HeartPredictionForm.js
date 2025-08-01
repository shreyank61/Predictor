import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function HeartPredictionForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    age: '', sex: '', cp: '', trestbps: '', chol: '',
    fbs: '', restecg: '', thalach: '', exang: '',
    oldpeak: '', slope: '', ca: '', thal: ''
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) navigate('/login');
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setError(null);
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://127.0.0.1:8000/acc/heart-predict/',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.data.prediction !== undefined) {
        navigate('/heart-result', {
          state: {
            input: formData,
            result: response.data
          }
        });
      } else {
        setError('Prediction failed.');
      }
    } catch (err) {
      if (err.response?.status === 401) {
        setError('Unauthorized. Please log in again.');
        navigate('/login');
      } else {
        setError('Prediction failed. Please check the input or server.');
      }
    }

    setLoading(false);
  };

 const fields = [
  { label: "Age", name: "age", placeholder: "e.g. 29–77" },
  { label: "Sex (1=Male, 0=Female)", name: "sex", placeholder: "0 or 1" },
  { label: "Chest Pain Type (0-3)", name: "cp", placeholder: "0 = typical, 1-3 = varying" },
  { label: "Resting BP", name: "trestbps", placeholder: "e.g. 90–140 mmHg" },
  { label: "Cholesterol", name: "chol", placeholder: "e.g. 125–300 mg/dL" },
  { label: "Fasting BS", name: "fbs", placeholder: "0 = <120 mg/dL, 1 = >120 mg/dL" },
  { label: "Resting ECG", name: "restecg", placeholder: "0 = Normal, 1–2 = Abnormal" },
  { label: "Max HR", name: "thalach", placeholder: "e.g. 70–200 bpm" },
  { label: "Exercise Angina", name: "exang", placeholder: "0 = No, 1 = Yes" },
  { label: "ST Depression", name: "oldpeak", placeholder: "e.g. 0.0–6.2" },
  { label: "Slope", name: "slope", placeholder: "0 = downsloping, 1–2 = up/flat" },
  { label: "Vessels (0-3)", name: "ca", placeholder: "Number of major vessels (0–3)" },
  { label: "Thal (1/6/7)", name: "thal", placeholder: "1 = Normal, 6 = Fixed defect, 7 = Reversible" }
];


  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-success fixed-top shadow-sm">
        <div className="container">
          <a className="navbar-brand fw-bold" href="/">🏥 Health Predictor</a>
          <button className="btn btn-light btn-sm" onClick={() => navigate('/')}>⬅ Home</button>
        </div>
      </nav>

      {/* Form Container */}
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh', background: '#e3f2fd', paddingTop: '80px' }}>
        <div className="p-4 rounded-4 shadow bg-white" style={{ width: '100%', maxWidth: '700px' }}>
          <h4 className="text-center fw-bold mb-4 text-success">❤️ Heart Disease Predictor</h4>

          <form onSubmit={handleSubmit}>
            <div className="row g-2">
              {fields.map(({ label, name,placeholder  }, idx) => (
                <div className="col-md-6" key={name}>
                 <div className="d-flex align-items-center mb-2">
  <label className="me-2 fw-semibold" style={{ minWidth: '100px' }}>{label}:</label>
  <input
    type="text"
    name={name}
    value={formData[name]}
    onChange={handleChange}
    className="form-control flex-grow-1"
    placeholder={placeholder}
    required
  />
</div>
              </div>
              ))}
            </div>

            <button type="submit" className="btn w-100 mt-3 fw-bold" style={{ backgroundColor: '#1565c0', color: 'white' }}>
              {loading ? '⏳ Predicting...' : '🚀 Predict'}
            </button>
          </form>

          {error && <div className="alert alert-danger mt-3">❌ {error}</div>}
        </div>
      </div>
    </>
  );
}

export default HeartPredictionForm;
