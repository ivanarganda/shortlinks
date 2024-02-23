import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import useUrl from "../hooks/state/useUrl";

const UrlsContext = createContext();

const UrlsProvider = ({ children }) => {
  const [urls, setUrls] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [idUser, setIdUser] = useState(0);
  const [errors, setErrors] = useState("");
  const [generated, setGenerated] = useState(false);
  const [copied, setCopied] = useState(false);

  const API_URL = useUrl("api");
  const DOMAIN_PROD = useUrl("domain");

  // Only for user
  const deleteUrl = async(idUrl,idUser) => {
    console.log( idUrl , idUser );

    await axios.delete(`${API_URL}/api/urls/?idUrl=${idUrl}&idUser=${idUser}`).then(( res )=>{

      console.log( 'deleted' );
      getUrls();

    })
    .catch((error) => handleRequestError(error, "Error deleting Short"));
  
  }; 

  const saveUrl = async(idUrl , idUser ) => {
    
    console.log( idUrl , idUser );

    axios
      .post(`${API_URL}/api/saveUrls` , {
        idUrl:idUrl,
        idUser:idUser
      })
      .then(() => {
        getUrls();
      })
      .catch((error) => handleRequestError(error, "Error saving Short"));
  };

  const handleCopyToClipboard = (id, text) => {
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(text)
        .then(() => setCopied(id))
        .catch((error) =>
          handleRequestError(error, "Error copying text to clipboard")
        );
    } else {
      copyTextFallback(text);
      setCopied(id);
    }
  };

  const copyTextFallback = (text) => {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
  };

  const generateShortSubmit = async (e, fields) => {
    e.preventDefault();

    setLoading(true);

    const url = e.target.url.value;
    const description = e.target.description.value;

    if (!url || !description) {
      setLoading(false);
      setErrors("Empty URL or description");
      return;
    }

    if (!/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(url)) {
      setLoading(false);
      setErrors("Incorrect format of URL");
      return;
    }

    try {
      await axios.get(`${API_URL}/proxy?url=${url}`);
      const response = await axios.post(`${API_URL}/urls/generateShort`, {
        url: url,
      });
      const json_data = {
        url: url,
        short: DOMAIN_PROD + response.data,
        description: description
      };
      await axios.post(`${API_URL}/api/urls`, json_data);

      // Handle requests made by users to avoid delay of server
      setTimeout(()=>{
        setGenerated(DOMAIN_PROD + response.data);
        getUrls();
        setLoading(false);
      },2000)
      
    } catch (error) {
      handleRequestError(
        error,
        "Error generating short URL or fetching data"
      );
    }
  };

  const handleSearch = (e) => {
    setLoading(true);
    setSearch(e.target.value);
  };

  const redirectByShortLink = (id) => {
    axios
      .get(`${API_URL}/api/urls/${id}`)
      .then((response) => {
        window.open(response.data[0].url, "_blank");
      })
      .catch((error) =>
        handleRequestError(error, "Error redirecting by short link")
      );
  };

  const checkSaved = async( item )=>{
    const response = await axios.get(`${API_URL}/api/urls/?url=${item.url}&short=${item.short}&description=${item.description}`);
    console.log( `${API_URL}/api/urls/?url=${item.url}&short=${item.short}&description=${item.description}` );
    return parseInt(response.data.length); 
  }

  const getUrls = () => {
    axios
      .get(`${API_URL}/api/urls/?short_like=${search}&idUser=${idUser}`)
      .then((response) => {
        setUrls(response.data);
        setLoading(false);
      })
      .catch((error) => handleRequestError(error, "Error fetching URLs"));
  };

  const handleRequestError = (error, errorMessage) => {
    console.error(`${errorMessage}:`, error);
    if (error.response) {
      setErrors(`Request failed with status: ${error.response.status}`);
    } else if (error.request) {
      setErrors("Request failed, no response received");
    } else {
      setErrors("Unknown error occurred");
    }
    setLoading(false);
  };

  useEffect(() => {
    getUrls(); 
  }, [search, copied, idUser]);

  return (
    <UrlsContext.Provider
      value={{
        urls,
        loading,
        errors,
        setErrors,
        setIdUser,
        generated,
        copied,
        handleCopyToClipboard,
        handleSearch,
        deleteUrl,
        saveUrl,
        checkSaved,
        redirectByShortLink,
        generateShortSubmit,
      }}
    >
      {children}
    </UrlsContext.Provider>
  );
};

export { UrlsContext, UrlsProvider };
