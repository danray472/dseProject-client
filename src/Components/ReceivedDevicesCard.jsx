import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SingleDeviceCard from './SingleDeviceCard'; // Import the DeviceCard component
import './cards.css';
import Spinner from './Spinner';

const ReceivedDevicesCard = ({searchTerm}) => {
  const [Received, setReceived] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [filteredDevices, setFilteredDevices] = useState([]);

  useEffect(() => {
    const fetchReceivedDevices = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/devices/Received`); // Update the endpoint to fetch completed devices
        setReceived(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching received devices:', error);
      }
    };

    fetchReceivedDevices();
  }, []);

  useEffect(() => {
    const filtered = Received.filter(device =>
      device.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      device.ticketNumber.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredDevices(filtered);
  }, [searchTerm, Received]);

  return (
    <div className="card-container">
      <div className='device-list'>
        {Loading ? <Spinner/> :
         filteredDevices.map(device => (
          <SingleDeviceCard key={device._id} device={device} />
        ))}
      </div>
    </div>
  );
};

export default ReceivedDevicesCard;
