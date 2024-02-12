import React, { useState, useContext } from 'react';
import axios from 'axios';

export default function useValidateForm() {

  const [fields, setFields] = useState({

    url: '',
    short: '',

  });

  const handleFields = (e) => {
 
    const { name, value } = e.target;

    setFields({
      ...fields,
      [name]: value,
    });

    console.log( fields );

  };

  return [fields,handleFields];

}
