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
  const deleteUrl = (id) => {
    axios
      .delete(`${API_URL}/api/urls/${id}`)
      .then(() => {
        setUrls(urls.filter((url) => url.id !== id));
      })
      .catch((error) => handleRequestError(error, "Error removing Short"));
  };

  const saveUrl = (json_data , idUser ) => {
    
    // json_data.idUser = idUser;
    // console.log( json_data ); 
    // axios
    //   .post(`${API_URL}/api/urls` , json_data )
    //   .then(() => {
    //     getUrls();
    //   })
    //   .catch((error) => handleRequestError(error, "Error saving Short"));
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
      const lastId = await axios.get(
        `${API_URL}/api/urls?_sort=id&_order=desc`
      );
      const newId = lastId.data.length !== 0 ? lastId.data[0].id + 1 : 1;
      const json_data = {
        id: newId,
        url: url,
        short: DOMAIN_PROD + response.data,
        description: description,
        idUser: 0,
      };
      await axios.post(`${API_URL}/api/urls`, json_data);
      const contentJSON = await axios.get(`${API_URL}/api/urls`);

      // Handle requests made by users to avoid delay of server
      setTimeout(()=>{
        setGenerated(DOMAIN_PROD + response.data);
        setUrls(contentJSON.data);
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
        window.open(response.data.url, "_blank");
      })
      .catch((error) =>
        handleRequestError(error, "Error redirecting by short link")
      );
  };

  const getUrls = () => {
    axios
      .get(`${API_URL}/api//urls/?short_like=${search}&idUser=${idUser}`)
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
        redirectByShortLink,
        generateShortSubmit,
      }}
    >
      {children}
    </UrlsContext.Provider>
  );
};

export { UrlsContext, UrlsProvider };
