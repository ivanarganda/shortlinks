import { useState } from "react";

export default function useValidateForm(type) {
  const [fields, setFields] = useState(
    type !== "login" || type !== "register"
      ? {
          url: "",
          short: "",
        }
      : {
          email: "",
          password: "",
      }
  );
  
  const handleFields = (e) => {

    const { name, value } = e.target;

    setFields({
      ...fields,
      [name]: value,
    });

  };

  return [fields , handleFields ];
}
