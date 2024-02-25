import React, { useState, useEffect } from 'react';
import useUrl from '../hooks/state/useUrl';
import axios from 'axios';

const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {

    const [session, setSession] = useState(JSON.parse(localStorage.getItem('auth')) || false);
    const [hasPassword, setHasPassword] = useState(JSON.parse(sessionStorage.getItem('auth_pass')) || '');
    const API_URL = useUrl('api');
    const [ errors , setErrors ] = useState('');

    const recoverySession = (auth) => {
        setSession(auth)
    }

    // It is gonna be used for checkout gets secured
    const setCookieSession = (token) => {
        var d = new Date();
        d.setTime(d.getTime() + (30 * 60 * 1000)); // Convert minutes to milliseconds
        var expires = "expires=" + d.toGMTString();
        document.cookie = "token_access" + "=" + token + ";" + expires + ";path=/";
    }

    const getTokenAccess = () => {
        var name = "token_access" + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var cookieArray = decodedCookie.split(';');

        for (var i = 0; i < cookieArray.length; i++) {
            var cookie = cookieArray[i];
            while (cookie.charAt(0) === ' ') {
                cookie = cookie.substring(1);
            }
            if (cookie.indexOf(name) === 0) {
                return cookie.substring(name.length, cookie.length);
            }
        }
        return "";
    }

    const deleteCookie = () => {
        document.cookie = "token_access" + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }

    const loginUserSubmit = async( event ) => {
    
        event.preventDefault();
        
        const formData = new FormData(event.target);
        const email = formData.get('username');
        const password = formData.get('password');

        let logged = false;

        if (email === '' || password === '') {
            setErrors('Empty fields');
            return;
        }

        const data = {

            email: email,
            password: btoa(password) 

        }

        try {

            const response = await axios.post(`${API_URL}/api/login`, data);
            logged = response.data.message;
            
        } catch (error) {

            let error_response = error.request.responseText;
            error_response = JSON.parse(error_response);
            setErrors(error_response.error); 

        }

        return logged; 
 
    }

    const registerUserSubmit = async( event ) => { 

        event.preventDefault();
        
        setErrors('');

        const formData = new FormData(event.target);
        const name = formData.get('name');
        const email = formData.get('username');
        const password = formData.get('password');

        let registered = false;

        if ( name === '' || email === '' || password === '') {
            setErrors('Empty fields');
            return;
        }

        const data = { 

            name: name,
            email: email,
            password: btoa(password),
            picture:''

        }

        try {

            await axios.post(`${API_URL}/api/register`, data);
            registered = true;
            
        } catch (error) {

            let error_response = error.request.responseText;
            error_response = JSON.parse(error_response);
            setErrors(error_response.error); 

        } 

        return registered; 

    }

    const logOut = () => {
        if (getTokenAccess() !== "") {
            deleteCookie();
        }
        localStorage.removeItem('auth');
        sessionStorage.removeItem('auth_pass');
        setSession(false);
        window.location = '/';
    }

    useEffect(() => {
        // Set first coockies to avoid third blocked cookies
        setHasPassword(JSON.parse(sessionStorage.getItem('auth_pass')));

    }, [session])

    return (
        <AuthContext.Provider value={{ session, setCookieSession, getTokenAccess, deleteCookie, setSession, recoverySession, setHasPassword, loginUserSubmit, errors, registerUserSubmit, logOut, hasPassword }}>
            {children}
        </AuthContext.Provider>
    )

}

export { AuthContext, AuthProvider };