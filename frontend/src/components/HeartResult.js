import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function HeartResult() {
  const navigate = useNavigate();
  const location = useLocation();
  const { input, result } = location.state || {};

  if (!input || !result) {
    return (
      <div className="text-center mt-5">
        <h4>⚠️ No result to show</h4>
        <button className="btn btn-primary mt-3" onClick={() => navigate('/heart')}>⬅ Go to Prediction</button>
      </div>
    );
  }

  const isRisk = result.prediction === 1;

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success fixed-top shadow-sm">
        <div className="container">
          <a className="navbar-brand fw-bold" href="/">🏥 Health Predictor</a>
          <button className="btn btn-light btn-sm" onClick={() => navigate('/')}>⬅ Home</button>
        </div>
      </nav>

      <div className="container" style={{ paddingTop: '90px', paddingBottom: '50px' }}>
        <div className="row justify-content-center">
          <div className="col-md-10 col-lg-8">
            <div className="card shadow border-0">
              <div className="card-body">
                <h4 className={`fw-bold text-center ${isRisk ? 'text-danger' : 'text-success'}`}>
                  {isRisk ? '💔 Risk of Heart Disease Detected' : '✅ No Risk Detected'}
                </h4>
                <p className="text-center mb-1">Confidence: <strong>{result.confidence}</strong></p>

                <hr />

                <h5 className="fw-bold">📋 Your Input:</h5>
                <ul className="list-group mb-3">
                  {Object.entries(input).map(([key, value]) => (
                    <li key={key} className="list-group-item d-flex justify-content-between">
                      <strong>{key.toUpperCase()}</strong>
                      <span>{value}</span>
                    </li>
                  ))}
                </ul>

                {isRisk && (
                  <>
                    <h5 className="fw-bold text-danger">💡 Health Tips:</h5>
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item">🍎 Maintain a heart-healthy diet</li>
                      <li className="list-group-item">🏃 Exercise at least 30 mins/day</li>
                      <li className="list-group-item">🚭 Avoid smoking and excess alcohol</li>
                      <li className="list-group-item">🩺 Regularly monitor cholesterol and BP</li>
                    </ul>
                  </>
                )}

                <div className="mt-4 text-center">
                  <button className="btn btn-outline-success me-2" onClick={() => navigate('/heart')}>
                    🔁 Predict Again
                  </button>
                  <button className="btn btn-primary" onClick={() => navigate('/')}>
                    🏠 Back to Home
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HeartResult;
