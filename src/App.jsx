import React, { useContext, useEffect } from 'react';
import { useNavigate , BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { AuthContext } from './Context/authContext';
// import useShortLink from './hooks/state/useShortLink';

function App() {

  const navigate = useNavigate();
  const { session, recoverySession } = useContext(AuthContext);

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem('auth')) || false;
    recoverySession(auth);
  }, []);

  useEffect(()=>{
    localStorage.setItem('auth', JSON.stringify(session));
    if (session.length !== 0) {
      localStorage.setItem('auth', JSON.stringify(session));
    }
  },[ session ])

  useEffect(() => {
    if (!session) {
      navigate('/login');
    } else {
      navigate('/dashboard');
    }
  }, [session, navigate]);

}

export default App;
