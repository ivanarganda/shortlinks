import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/authContext';
import { useLocation } from 'react-router-dom';

const Auth = () => {
  const navigate = useNavigate();
  const { session, recoverySession } = useContext(AuthContext);
  const history = useLocation();
  let { pathname } = history;

  // Redirect to login if user is not authenticated and tries to access home or dashboard
  if ((pathname === '/' || pathname === '/dashboard') && !session) {
    pathname = '/login';
  }

  // Recover session from local storage on component mount
  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem('auth')) || false;
    recoverySession(auth);
  }, []);

  // Update session in local storage when it changes
  useEffect(() => {
    localStorage.setItem('auth', JSON.stringify(session));
  }, [session]);

  // Redirect based on session state
  useEffect(() => {
    if (!session) {
      navigate(pathname);
    } else {
      navigate('/dashboard');
    }
  }, [session, navigate]);

  // Since this is a logic component, it doesn't render any JSX
  // You can replace this with a meaningful message or loader if desired
  return null;
};

export { Auth };
