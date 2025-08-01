import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const tips = {
  "Type 1": "Type 1 diabetes requires insulin therapy. Regular monitoring and lifestyle changes are essential.",
  "Type 2": "Type 2 can often be managed with diet and exercise. Medication may be necessary over time.",
  "Prediabetic": "You're at risk of diabetes. Focus on lifestyle changes and regular screening.",
};

const DiabeticResultPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return (
      <div className="text-center mt-5">
        <h5>No prediction data available.</h5>
        <button className="btn btn-primary mt-3" onClick={() => navigate('/predict')}>
          Go to Predictor
        </button>
      </div>
    );
  }

  const { input, result } = state;

  return (
    <div className="container mt-5">
      <h3 className="text-center mb-4">🧾 Prediction Result</h3>

      <table className="table table-bordered">
        <thead className="table-light">
          <tr>
            <th>Input Field</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(input).map(([key, value]) => (
            <tr key={key}>
              <td>{key.replace(/_/g, ' ').toUpperCase()}</td>
              <td>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="alert alert-success mt-4">
        <h5>🎯 Prediction: <strong>{result.Prediction}</strong></h5>
        <p>📊 Confidence: <strong>{result['Confidence Score']}</strong></p>
        <p className="mt-3">💡 Tip:</p>
        <blockquote className="blockquote">
          {tips[result.Prediction] || 'No specific advice available.'}
        </blockquote>
      </div>

      <div className="text-center mt-4">
        <button className="btn btn-outline-primary" onClick={() => navigate('/predict')}>
          🔁 Try Again
        </button>
      </div>
    </div>
  );
};

export default DiabeticResultPage;
