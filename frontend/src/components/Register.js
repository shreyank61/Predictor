import React, { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Typography,
  Paper,
} from '@mui/material';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; // ✅ Import Link

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    first_name: '',
    last_name: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:8000/acc/register/',
        formData
      );
      console.log('Success:', response.data);
      alert('Registered successfully!');
      navigate('/login'); // ✅ Redirect to login after registration
    } catch (error) {
      console.error('Error:', error.response?.data || error.message);
      alert('Registration failed. See console for details.');
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
          Register
        </Typography>

        <form onSubmit={handleSubmit} noValidate>
          <Box my={2}>
            <TextField
              fullWidth
              required
              id="email"
              label="Email"
              name="email"
              type="email"
              variant="outlined"
              value={formData.email}
              onChange={handleChange}
            />
          </Box>

          <Box my={2}>
            <TextField
              fullWidth
              id="first_name"
              label="First Name"
              name="first_name"
              type="text"
              variant="outlined"
              value={formData.first_name}
              onChange={handleChange}
            />
          </Box>

          <Box my={2}>
            <TextField
              fullWidth
              id="last_name"
              label="Last Name"
              name="last_name"
              type="text"
              variant="outlined"
              value={formData.last_name}
              onChange={handleChange}
            />
          </Box>

          <Box my={2}>
            <TextField
              fullWidth
              required
              id="password"
              label="Password"
              name="password"
              type="password"
              variant="outlined"
              value={formData.password}
              onChange={handleChange}
            />
          </Box>

          <Box mt={3} textAlign="center">
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </Box>
        </form>

        {/* 🔗 Already have an account? Login */}
        <Box mt={3} textAlign="center">
          <Typography variant="body2">
            Already registered? <Link to="/login">Login</Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default Register;
