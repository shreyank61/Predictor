import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
<>
      {/* 🧭 Navbar */}
      <nav
  className="navbar navbar-expand-lg shadow-sm fixed-top"
  style={{ backgroundColor: '#00796b' }}
>
  <div className="container">
    <a className="navbar-brand fw-bold text-white" href="/">
      🩺 HealthPredict
    </a>

    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarContent"
    >
      <span className="navbar-toggler-icon" />
    </button>

    <div className="collapse navbar-collapse" id="navbarContent">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        {token ? (
          <li className="nav-item">
            <button
              className="btn fw-bold px-3 py-1 rounded-3 border-0"
              style={{ backgroundColor: 'white', color: '#00796b' }}
              onClick={handleLogout}
            >
              🔓 Logout
            </button>
          </li>
        ) : (
          <>
            <li className="nav-item me-2">
              <a
                className="btn fw-bold px-3 py-1 rounded-3 border-0"
                style={{ backgroundColor: 'white', color: '#00796b' }}
                href="/login"
              >
                🔐 Login
              </a>
            </li>
            <li className="nav-item">
              <a
                className="btn fw-bold px-3 py-1 rounded-3 border border-white text-white"
                href="/register"
              >
                📝 Register
              </a>
            </li>
          </>
        )}
      </ul>
    </div>
  </div>
</nav>


      {/* 🏠 Home Page Content */}
      <div
        style={{
          minHeight: '100vh',
          background: 'linear-gradient(to right, #f0f4f8, #d9e2ec)',
          paddingTop: '80px',
          paddingBottom: '60px',
        }}
      >
        <div className="container">
          <h2 className="text-center mb-5 fw-bold text-dark">Health Prediction Portal</h2>
          <div className="row justify-content-center g-4">

            {/* Diabetes Predictor Card */}
            <div className="col-md-6 col-lg-4">
              <div className="card h-100 shadow border-0">
                <img
                  src="https://img.freepik.com/free-vector/diabetes-concept-illustration_114360-3640.jpg?semt=ais_hybrid"
                  className="card-img-top"
                  alt="Diabetes Predictor"
                  style={{ height: '230px', objectFit: 'cover' }}
                />
                <div className="card-body">
                  <h5 className="card-title fw-semibold">Diabetes Predictor</h5>
                  <p className="card-text">
                    Enter your health metrics and check your risk for diabetes.
                  </p>
                  <a href="/predict" className="btn btn-outline-primary w-100">Try Now</a>
                </div>
              </div>
            </div>

            {/* Heart Disease Predictor Card */}
            <div className="col-md-6 col-lg-4">
              <div className="card h-100 shadow border-0">
                <img
                  src="/heart_pic.png"
                  className="card-img-top"
                  alt="Heart Disease Predictor"
                  style={{ height: '230px', objectFit: 'cover' }}
                />
                <div className="card-body">
                  <h5 className="card-title fw-semibold">Heart Disease Predictor</h5>
                  <p className="card-text">
                    Analyze your chances of heart disease based on your inputs.
                  </p>
                  <a href="/heart" className="btn btn-outline-danger w-100">Predict Now</a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>


  );
};

export default HomePage;
