import React, { useState } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { useNavigate, Link } from 'react-router-dom';
import Spinner from './Spinner'; // Import Spinner component
import './login.css'; // Import CSS for login form

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // Loading state
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when form is submitted
    try {
      const response = await axios.post('http://localhost:5000/auth/login', { email, password });
      console.log('Login successful:', response.data);
      enqueueSnackbar('Login successful', { variant: 'success' });
      navigate('/Home'); // Redirect to another page after successful login
    } catch (error) {
      console.error('Login error:', error.response?.data);
      enqueueSnackbar('Login error: ' + error.response?.data?.message, { variant: 'error' });
    } finally {
      setLoading(false); // Set loading to false after response is received
    }
  };

  return (
    <div className="login-container">
      <h2>Login to ElectroRenew</h2>
      {loading ? (
        <Spinner /> // Display spinner when loading
      ) : (
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
      )}
      <p>Don't have an account? <Link to="/register">Signup</Link></p> {/* Link to the signup page */}
    </div>
  );
};

export default Login;
