import React, { useState, useEffect } from 'react';

const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {

    const [session, setSession] = useState(JSON.parse(localStorage.getItem('auth')) || false);
    const [hasPassword, setHasPassword] = useState(JSON.parse(sessionStorage.getItem('auth_pass')) || '');

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

    const loginUserSubmit = () => {

    }

    const registerUserSubmit = () => {

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
        <AuthContext.Provider value={{ session, setCookieSession, getTokenAccess, deleteCookie, setSession, recoverySession, setHasPassword, loginUserSubmit, registerUserSubmit, logOut, hasPassword }}>
            {children}
        </AuthContext.Provider>
    )

}

export { AuthContext, AuthProvider };