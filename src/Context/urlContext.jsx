import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

const UrlsContext = createContext();

const UrlsProvider = ({ children }) => {
    const [urls, setUrls] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);

    const API_URL = 'https://ws-shortlinks.onrender.com/api/urls/';
    // const API_URL = 'http://linkshort.website:3000/api/urls/';

    const deleteUrl = (id) => {
        axios.delete(`${API_URL}${id}`).then(() => {
            // Remove the deleted URL from the state
            setUrls(urls.filter(url => url.id !== id));
        }).catch(error => {
            console.error('Error deleting URL:', error);
        });
    };

    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    const redirectByShortLink = (id) => {
        axios.get(`${API_URL}${id}`).then(response => {
            window.open(response.data.url, '_blank');
        }).catch(error => {
            console.error('Error redirecting by short link:', error);
        });
    };

    useEffect(() => {
        setLoading(true);
        axios.get(`${API_URL}?short_like=${search}&idUser=0`).then(response => {
            setUrls(response.data);
            setLoading(false);
        }).catch(error => {
            console.error('Error fetching URLs:', error);
            setLoading(false);
        });
    }, [search]);

    return (
        <UrlsContext.Provider value={{ urls, loading, handleSearch, deleteUrl, redirectByShortLink }}>
            {children}
        </UrlsContext.Provider>
    );
};

export { UrlsContext, UrlsProvider };
