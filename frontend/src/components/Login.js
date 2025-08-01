import React, { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Typography,
  Paper,
} from '@mui/material';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom'; // ⬅️ Import Link here

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:8000/acc/login/', formData);
      localStorage.setItem('token', response.data.token);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.detail || 'Invalid email or password');
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f5f5f5"
    >
      <Paper elevation={3} sx={{ padding: 4, width: 400 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Login
        </Typography>

        <form onSubmit={handleSubmit} noValidate>
          <Box my={2}>
            <TextField
              fullWidth
              required
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              variant="outlined"
            />
          </Box>

          <Box my={2}>
            <TextField
              fullWidth
              required
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              variant="outlined"
            />
          </Box>

          {error && (
            <Typography color="error" align="center" mb={2}>
              {error}
            </Typography>
          )}

          <Box mt={3} textAlign="center">
            <Button variant="contained" color="primary" type="submit">
              Login
            </Button>
          </Box>
        </form>

        {/* 🔗 Not registered link */}
        <Box mt={3} textAlign="center">
          <Typography variant="body2">
            Not registered? <Link to="/register">Sign up</Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;
