import { useEffect } from 'react';
import axios from 'axios';

export default function useShortLink( key , code ) {

    useEffect(() => {
        // Perform any necessary side effects using the context values
        // For example:
        axios.get(`https://ws-shortlinks.onrender.com/api/urls?short_like=https://linkshort.website/${key}/${code}`).then(( response )=>{
            if ( response.data[0].length !== 0 ){
                window.location = response.data[0].url; 
            }
        })
    }, []);
 // Return any values or functions you need
}
