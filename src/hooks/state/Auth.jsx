import React, { useContext , useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/authContext';
import { useLocation } from 'react-router-dom'

const Auth = ()=> {

  const navigate = useNavigate();
  const { session, recoverySession } = useContext(AuthContext);
  const history = useLocation(null);
  let { pathname } = history; // target current path

  pathname = pathname == '/' ? '/login' : pathname;

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
    if ( session==false ) {
      navigate(pathname);
    } else {
      navigate('/dashboard');
    }
  }, [session, navigate]);
}

export { Auth };
