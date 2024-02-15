import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

const UrlsContext = createContext();

const UrlsProvider = ({ children }) => {
  const [urls, setUrls] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [idUser, setIdUser] = useState(0);
  const [errors, setErrors] = useState("");
  const [generated, setGenerated] = useState(false);
  const [copied, setCopied] = useState(false);

  const API_URL = 'https://ws-shortlinks.onrender.com';
//   const API_URL = "http://localhost:3000";
  const DOMAIN_PROD = "https://linkshort.website";

  const deleteUrl = (id) => {
    axios
      .delete(`${API_URL}/api/urls/${id}`)
      .then(() => {
        // Remove the deleted URL from the state
        setUrls(urls.filter((url) => url.id !== id));
      })
      .catch((error) => {
        console.error("Error deleting URL:", error);
      });
  };

  const handleCopyToClipboard = (id, text) => {
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          console.log("Text copied to clipboard:", text);
          setCopied(id);
        })
        .catch((error) => {
          console.error("Error copying text to clipboard:", error);
        });
    } else {
      copyTextFallback(text);
      setCopied(id);
    }
    console.log(copied);
  };

  const copyTextFallback = (text) => {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    console.log("Text copied to clipboard (fallback):", text);
  };

  const generateShortSubmit = async (e, fields) => {
    e.preventDefault();

    setLoading(true);

    let url = e.target.url.value;

    if (!url) {
      setLoading(false);
      setErrors("Empty URL");
      return;
    }

    if (!/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(url)) {
      setLoading(false);
      setErrors("Incorrect format of URL");
      return;
    }

    try {
      // Check if the URL exists
      await axios.get(`${API_URL}/proxy?url=${url}`); // Usamos el servidor proxy
      // If the URL exists, attempt to generate a short URL
      const response = await axios.post(`${API_URL}/urls/generateShort`, {
        url: url,
      });
      console.log(DOMAIN_PROD + response.data); // Assuming your response contains data
      let lastId = await axios.get(`${API_URL}/api/urls?_sort=id&_order=desc`);
      let json_data = {
        id: lastId.data[0].id + 1,
        url: url,
        short: DOMAIN_PROD + response.data,
        description: "",
        idUser: 0,
      };
      console.log(json_data);
      axios.post(`${API_URL}/api/urls`, json_data);
      const contentJSON = await axios.get(`${API_URL}/api/urls`);
      setGenerated(DOMAIN_PROD + response.data);
      setUrls(contentJSON.data);
      setLoading(false);
    } catch (error) {
      // Si falla la solicitud HEAD, establece un mensaje de error indicando que la URL no existe
      console.error("Error while fetching data:", error);
      setErrors("URL does not exist: " + url);
      setLoading(false);
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
      .catch((error) => {
        console.error("Error redirecting by short link:", error);
      });
  };

  const getUrls = () => {
    axios
      .get(`${API_URL}/api/urls/?short_like=${search}&idUser=${idUser}`)
      .then((response) => {
        setUrls(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching URLs:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    getUrls();
  }, [search, copied]);

  return (
    <UrlsContext.Provider
      value={{
        urls,
        loading,
        errors,
        setErrors,
        generated,
        copied,
        handleCopyToClipboard,
        handleSearch,
        deleteUrl,
        redirectByShortLink,
        generateShortSubmit,
      }}
    >
      {children}
    </UrlsContext.Provider>
  );
};

export { UrlsContext, UrlsProvider };
