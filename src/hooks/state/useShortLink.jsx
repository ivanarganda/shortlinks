import React , { useEffect } from 'react';
import axios from 'axios';

export default function useShortLink( key , code ) {

    useEffect(() => {
        // Perform any necessary side effects using the context values
        // For example:
        axios.get(`https://ws-shortlinks-u8u4.onrender.com/api/urls/?short_like=https://linkshort.website/${key}/${code}`).then(( response )=>{
            if ( response.data.length !== 0 ){
                window.location = response.data[0].url; 
            }
        })
    }, []);
 // Return any values or functions you need
}
