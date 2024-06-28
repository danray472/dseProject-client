import React, { useState } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { useNavigate, Link } from 'react-router-dom';
import Spinner from './Spinner'; // Import Spinner component
import './register.css'; // Import CSS for signup form

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // Loading state
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when form is submitted
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth/register`, { username, email, password });
      console.log('Signup successful:', response.data);
      enqueueSnackbar('Signup successful', { variant: 'success' });
      navigate('/Home'); // Redirect to the home page after successful signup
    } catch (error) {
      console.error('Signup error:', error.response?.data || error.message);
      enqueueSnackbar(error.response?.data?.message || error.message, { variant: 'error' });
    } finally {
      setLoading(false); // Set loading to false after response is received
    }
  };

  return (
    <div className="signup-container">
      <h2>SignUp to ElectroRenew</h2>
      {loading ? (
        <Spinner /> // Display spinner when loading
      ) : (
        <form onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
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
          <button type="submit">Signup</button>
        </form>
      )}
      <p>Already have an account? <Link to="/login">Login</Link></p> {/* Link to the login page */}
    </div>
  );
};

export default Signup;
