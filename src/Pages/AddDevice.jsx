import React, { useState } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import './modal.css';
import { FaArrowLeft } from 'react-icons/fa';

const AddDevice = ({ onClose }) => {
  const [deviceInfo, setDeviceInfo] = useState({
    ticketNumber: '',
    deviceType: '',
    customerName: '',
    customerEmail: '',
    deviceState: 'In-repair', // Default state
  });
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate(); // Access navigate function

  // Function to handle changes in the input fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDeviceInfo({ ...deviceInfo, [name]: value });
  };

  // Function to handle saving the device
  const handleSaveDevice = (e) => {
    e.preventDefault(); // Prevent default form submission
    setLoading(true);
    // Make a POST request to your backend API to save the device
    axios
      .post('http://localhost:5000/devices', deviceInfo)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Device created successfully', { variant: 'success' });
        onClose(); // Close the modal after successful creation
        navigate('/AllDevices'); // Redirect to AllDevices page
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error', { variant: 'error' });
        console.error('Error creating device:', error);
      });
  };

  // Function to handle clicking the back button
  const handleBackButtonClick = () => {
    navigate('/Home'); // Navigate to the Home page
  };

  // Function to handle clicking outside the modal
  const handleClickOutside = (e) => {
    if (e.target === e.currentTarget) {
    handleBackButtonClick(); // Navigate back to the Home page
    }
  };

  return (
    <div className="modal" onClick={handleClickOutside}>
      <div className="modal-content">
        <FaArrowLeft className="back-button" onClick={handleBackButtonClick} /> {/* Back button */}
        <h2>Add New Device</h2>
        <form onSubmit={handleSaveDevice}>
          <div>3
            <label>Ticket Number:</label>
            <input
              type="text"
              name="ticketNumber"
              value={deviceInfo.ticketNumber}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Device Type:</label>
            <input
              type="text"
              name="deviceType"
              value={deviceInfo.deviceType}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Customer Name:</label>
            <input
              type="text"
              name="customerName"
              value={deviceInfo.customerName}
              onChange={handleInputChange}
            />
          </div>
          <div> {/* Add input field for customer email */}
            <label>Customer Email:</label>
            <input
              className='email-input'
              type="email"
              name="customerEmail"
              value={deviceInfo.customerEmail}
              onChange={handleInputChange}
            />
          </div>
          <button type="submit" disabled={loading} className="submit-button">
            {loading ? 'Saving...' : 'Save Device'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddDevice;
