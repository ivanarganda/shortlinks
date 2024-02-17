import React, { useContext , useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/authContext';

export default function Auth() {

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
    if (session === false ) {
      navigate('/login');
    } else {
      navigate('/dashboard');
    }
  }, [session, navigate]);
  
}
