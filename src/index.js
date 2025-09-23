import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import WeatherApp from './WeatherApp/WeatherApp';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import notFound from './NotFound';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WeatherApp/>}>          
          <Route path="*" element={<notFound/>}/>
        </Route>
      </Routes> 
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
