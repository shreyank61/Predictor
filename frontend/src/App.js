import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import DiabeticPredictionForm from './components/DiabeticPredictionForm';
import HomePage from './components/HomePage';
import DiabeticResultPage from './components/DiabeticResultPage';
import HeartPredictionForm from './components/HeartPredictionForm';
import HeartResult from './components/HeartResult';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<HomePage/>} />
        <Route path="/predict" element={<DiabeticPredictionForm/>} />
        <Route path="/diabetic-result" element={<DiabeticResultPage />} />
        <Route path="/heart" element={<HeartPredictionForm />} />
        <Route path="/heart-result" element={<HeartResult />} />
      </Routes>
    </Router>
  );
}

export default App;
