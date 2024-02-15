import React, { useContext, useState } from "react";
import useFadeIn from "../hooks/state/useFadeIn";
import useValidateForm from "./../hooks/state/useValidateForm";
import { UrlsContext } from "../Context/urlContext";
import CircularProgress from '@mui/material/CircularProgress';
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckIcon from "@mui/icons-material/Check";

export default function GenerateShort({ changeType }) {
  const [Section] = useFadeIn(true);
  const [ fields, handleFields ] = useValidateForm("urls");
  const { generateShortSubmit , copied , handleCopyToClipboard , loading , errors , generated } = useContext(UrlsContext);

  return (
    <div className="w-full max-w-screen-xl mx-auto px-6">
      <div className="flex justify-center p-4 px-3 py-10">
        <div className="w-full max-w-xl">
          <div className="bg-white shadow-md rounded-lg px-2 py-2 mb-4 pl-2">
            <div className="block text-gray-700 text-lg flex flex-row justify-around items-center font-semibold py-2 px-2">
              <span>Generate short link</span>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  changeType("listUrls");
                }}
                className="px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
              >
                View all shorts
              </button>
            </div>
            <div className="bg-gray-100 rounded-b-lg py-12 px-4 lg:px-24 text-gray-600">
              <p className="text-center text-sm text-gray-500 font-light">
                Type a link to generate
              </p>
              <form
                onSubmit={async(e) => await generateShortSubmit(e, fields) }
                className="mt-6"
              >
                {
                  !loading ? (
                    <div className="relative">
                      <Section>
                        {
                          errors && <span className="text-red-400 font-bold">{errors}<br/></span>
                        }
                        {
                          generated && 
                          <div className="flex flex-row gap-2 w-full items-center text-gray-600 border pl-12 shadow-sm focus:shadow-md focus:placeholder-gray-600 transition rounded-md w-full py-3 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline">
                              <span>{ generated }</span>
                              { 
                                copied === generated ?  <ContentCopyIcon onClick={()=>handleCopyToClipboard( generated , generated )}/> : <CheckIcon />
                              }
                          </div>
                        }
                      </Section>
                      { !generated && (
                      <input
                        type="text"
                        id="url"
                        name="url"
                        className={`appearance-none text-gray-600 border pl-12 ${ errors != "" ? "border-red-400" : "border-gray-100" }  shadow-sm focus:shadow-md focus:placeholder-gray-600 transition rounded-md w-full py-3 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline`}
                        placeholder="https://example.com"
                        onChange={handleFields}
                      /> ) }
                    </div>  
                  ) : (
                      <CircularProgress />
                  )
                }
                
                <div className="flex items-center justify-center mt-8">
                  <input
                    type="submit"
                    value="Generate"
                    className="text-white py-2 px-4 uppercase rounded bg-indigo-500 hover:bg-indigo-600 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
