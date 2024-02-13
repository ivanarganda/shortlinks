import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App.jsx'
import { MsgProvider } from './Context/messageContext';
import { AuthProvider } from './Context/authContext';
import Login from './Components/Login';
import Register from './Components/Register';
import { UrlsProvider } from './Context/urlContext';
import Header from './Components/Header';
import Snackbar_ from './Components/Snackbar';
import Dashboard from './Components/Dashboard';
import './index.css'
import Footer from './Components/Footer.jsx';
import MyUrls from './Components/MyUrls';
import RedirectShort from './Components/RedirectShort';
import useFadeIn from './hooks/state/useFadeIn.jsx';

const [ Section ] = useFadeIn();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
    <UrlsProvider>
      <MsgProvider>
        <Router basename="/">
          <Header />
          <Routes>
            <Route exact path="/" element={<App />} />
            <Route exact path="/:key/:code" element={<RedirectShort />} />
            <Route exact path="/login" element={<Section><Login /></Section>} />
            <Route exact path="/register" element={<Section><Register /></Section>} />
            <Route exact path="/dashboard" element={<Section><Dashboard /></Section>} />
            <Route exact path="/dashboard/profile" element={<MyUrls />} />       
          </Routes>
          <Section><Footer /></Section>
          <Snackbar_ />
        </Router>
      </MsgProvider>
      </UrlsProvider>
    </AuthProvider>
  </React.StrictMode>
)
