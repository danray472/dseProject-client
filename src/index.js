import React from 'react';
import ReactDOM from 'react-dom'; 
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { AuthProvider } from './Components/AuthProvider'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <SnackbarProvider>
        <AuthProvider> {/* Wrap the App component with AuthProvider */}
          <App />
        </AuthProvider>
      </SnackbarProvider>
    </BrowserRouter>
  </React.StrictMode>
); 
