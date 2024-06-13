const handleSearch = (searchTerm) => {
    useEffect(() => {
      const fetchDevices = async () => {
        try {
    const results = await  axios.get('http://localhost:5000/devices');
    results.devices.filter( (device) => 
      device.ticketNumber.includes(searchTerm) || device.customerName.includes(searchTerm)
        } catch(error){
      console.error('Error fetching devices:', error);
        }
    )}}}, []);
    
    setSearchResults(results);
  };