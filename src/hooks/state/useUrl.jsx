export default function useUrl(type) {
    // const API_URL = 'https://ws-shortlinks.onrender.com';
    const API_URL = "http://localhost:3000";
    const URLS = {
        'api':API_URL,
        'domain':'https://linkshort.website'
    }

    return URLS[type];
}
