import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'


import { BrowserRouter } from 'react-router-dom';


import AppContextProvider from './context/AppContext';
import AdminContextProvider from './context/AdminContext';
import DoctorContextProvider from './context/DoctorContext';


// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )



createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AppContextProvider>
      <AdminContextProvider>
          <DoctorContextProvider>
              <App />
          </DoctorContextProvider>
      </AdminContextProvider>
    </AppContextProvider>
  </BrowserRouter>,
)
