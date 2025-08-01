import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function DiabeticPredictionForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    age: '',
    bs_fast: '',
    bs_pp: '',
    plasma_r: '',
    plasma_f: '',
    hbA1c: ''
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) navigate('/login');
  }, [navigate]);

  const handleChange = e => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (loading) return;

    setError(null);
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://127.0.0.1:8000/acc/predict/',
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.Error === '0') {
        navigate('/diabetic-result', { state: { input: formData, result: response.data } });
      } else {
        setError(response.data.Message || 'Prediction failed.');
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
    { label: 'Age', name: 'age', placeholder: '18–100' },
    { label: 'BS Fast', name: 'bs_fast', placeholder: '70–130 mg/dL' },
    { label: 'BS PP', name: 'bs_pp', placeholder: '100–180 mg/dL' },
    { label: 'Plasma Random', name: 'plasma_r', placeholder: '80–200 mg/dL' },
    { label: 'Plasma Fasting', name: 'plasma_f', placeholder: '70–110 mg/dL' },
    { label: 'HbA1c', name: 'hbA1c', placeholder: '4.0–14.0 %' }
  ];

  return (
  <div style={{ background: '#e3f2fd', minHeight: '100vh' }}>
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container">
        <a className="navbar-brand fw-bold" href="/">🏥 Health Predictor</a>
        <button className="btn btn-light btn-sm" onClick={() => navigate('/')}>⬅ Home</button>
      </div>
    </nav>

<div className="d-flex justify-content-center align-items-start" style={{ marginTop: '80px' }}>
      <div className="p-4 rounded-4 shadow bg-white" style={{ width: '100%', maxWidth: '700px' }}>
        <h4 className="text-center fw-bold mb-4 text-success">🩺 Diabetic Type Predictor</h4>

        <form onSubmit={handleSubmit}>
          <div className="row g-2 d-flex justify-content-center align-items-center">
            {fields.map(({ label, name, placeholder }) => (
              <div className="col-md-6" key={name}>
                <div className="d-flex align-items-center mb-2">
                  <label className="me-2 fw-semibold" style={{ minWidth: '130px' }}>{label}:</label>
                  <input
                    type="number"
                    step="any"
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    className="form-control"
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
  </div>
);
}
export default DiabeticPredictionForm;
