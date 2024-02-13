import React, { useContext, useEffect, useState } from 'react';
import { UrlsContext } from '../Context/urlContext';
import { MsgContext } from '../Context/messageContext';

import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';

export default function Urls({ changeType }) {
  const { useMessage } = useContext(MsgContext);
  const { urls, setUrls, redirectByShortLink, handleSearch } = useContext(UrlsContext);

  const [ copied , setCopied ] = useState( false );

  const handleCopyToClipboard = ( id , text) => {

    if (navigator.clipboard) {
      navigator.clipboard.writeText(text)
        .then(() => {
          console.log('Text copied to clipboard:', text);
          setCopied( id );
        })
        .catch((error) => {
          console.error('Error copying text to clipboard:', error);
        });
    } else {
      copyTextFallback(text);
      setCopied( id );
    }

    if ( copied ){
      useMessage(`Copied ${text}`, 'success', 1000, 'top', 'center');
    }
  };

  const copyTextFallback = (text) => {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    console.log('Text copied to clipboard (fallback):', text);
  };

  return (
    <div className="w-full max-w-screen-xl mx-auto px-6">
      <div className="flex justify-center p-4 px-3 py-10">
        <div className="w-full max-w-xl">
          <div className="bg-white shadow-md rounded-lg px-2 py-2 mb-4 pl-2">
            <div className="block text-gray-700 text-lg flex flex-row justify-around items-center font-semibold py-2 px-2">
              <span>Search for shorted links</span>
              <button onClick={(e) => {
                e.preventDefault();
                changeType('generateShort');
              }} className='px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900'>Generate</button>
            </div>
            <div className="flex items-center mt-3 bg-gray-200 rounded-md">
              <div className="pl-2">
                <svg className="fill-current text-gray-500 w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path className="heroicon-ui" d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
                </svg>
              </div>
              <input
                className="w-full rounded-md bg-gray-200 text-gray-700 leading-tight focus:outline-none py-2 px-2"
                onChange={handleSearch}
                onContextMenu={(e) => e.preventDefault()} // Prevent default context menu
                id="search" type="text" placeholder="https://lnk/us" />
            </div>
            <div className='h-60 overflow-auto w-full transition:true'>
              {
                urls.length !== 0 ?
                  urls.map((item) => {
                    return <div key={item.id} className="py text-sm">
                      <div className="flex flex-col lg:flex-row lg:justify-between items-center cursor-pointer text-gray-700 rounded-md px-2 py-2 my-2">
                        <div className='flex flex-col mb-2 sm:mb-0 justify-center sm:flex-row sm:justify-around items-center'>
                          <span className="bg-green-400 h-2 w-2 m-2 rounded-full"></span>
                          <div className="flex-grow font-medium px-2">
                            <span className='' onClick={() => redirectByShortLink(item.id)}>{item.short}</span>
                          </div>
                          <div className="flex-grow font-medium px-2">{'('}{item.description}{')'}</div>
                        </div>
                        <div className='flex flex-row items-center'>
                          <div className="text-sm font-normal text-gray-500 tracking-wide pr-2">
                            {
                                copied !== item.id ? 
                                    <button aria-label='button for copy short' onClick={() => handleCopyToClipboard( item.id , item.short)} className='px-5 py-3 text-base font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:ring-green-300 dark:focus:ring-green-900'>
                                        <ContentCopyIcon />
                                    </button>
                                :  
                                    <button aria-label='for decoration, check' onClick={( e ) => e.preventDefault() } className='px-5 py-3 text-base font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:ring-green-300 dark:focus:ring-green-900'>
                                        <CheckIcon />
                                    </button>
                            }
                            
                          </div>
                          <div className="text-sm font-normal text-gray-500 tracking-wide pr-2">
                            <span className='px-5 py-3 text-base font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:ring-green-300 dark:focus:ring-green-900'>Add</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  })
                  : (
                    <div className="w-fulll py-3 text-sm">
                      <div className="flex justify-center m-auto items-center cursor-pointer text-gray-700 rounded-md px-2 py-2 my-2">
                        <span className='text-xl'>There´re no urls</span>
                      </div>
                    </div>
                  )
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
