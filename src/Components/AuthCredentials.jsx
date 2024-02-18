import React, { useContext, useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { MsgContext } from './../Context/messageContext';
import { AuthContext } from './../Context/authContext';
import axios from 'axios';
import useUrl from '../hooks/state/useUrl';
import { Backdrop, CircularProgress } from '@mui/material';

export default function AuthCredentials() {

  const { setSession } = useContext(AuthContext);
  const [loging, setLoging] = useState(false);
  const { useMessage } = useContext(MsgContext);
  const API_URL = useUrl('api');

  const authGoogle = async (response_login) => {

    useMessage(`Logging.....`, 'success', 2000, 'top', 'center');

    await axios
      .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${response_login.access_token}`, {
        headers: {
          Authorization: `Bearer ${response_login.access_token}`,
          Accept: 'application/json'
        }
      })
      .then(async (res) => {

        const { name, email, id, picture } = res.data;

        const response = await axios.get(`${API_URL}/api/users/?email=${email}`);

        // Set a first party cookie for GoogleOAuth

        // const { password } = response.data.data.user

        // response.data.picture = picture;

        console.log(response.data.length);

        if (response.data.length !== 0) {

          let json = response.data.map((item) => {
            return {
              id: item.id,
              name: item.name,
              email: item.email,
              jwt_token: item.jwt_token,
              picture:picture
            }
          })

          useMessage(`Logged as ${name} ... redirecting...`, 'success', 2000, 'top', 'center');
          setLoging(true);
          setTimeout(() => {
            setLoging(false);
            localStorage.setItem('auth', JSON.stringify(json));
            setSession(JSON.parse(localStorage.getItem('auth')));
          }, 3000)

        } else {

          useMessage(`${email} does not exist must be registered`, 'error', 5000, 'top', 'center');

        }

      }).catch((error) => {
        const messageError = error.response.data.error.user;
        useMessage(`${messageError}`, 'error', 5000, 'top', 'center');
      })

  }

  const login = useGoogleLogin({
    onSuccess: (response) => authGoogle(response),
  })

  return (
    <div className="bg-white rounded-t-lg p-8">
      <p className="text-center text-sm text-gray-400 font-light">
        Sign in with
      </p>
      <div className="flex items-center justify-center space-x-4 mt-3">
        <button onClick={() => login()} className="flex items-center py-2 px-4 text-sm uppercase rounded bg-white hover:bg-gray-100 text-indigo-500 border border-transparent hover:border-transparent hover:text-gray-700 shadow-md hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 mr-3"
            viewBox="0 0 48 48"
          >
            <path
              fill="#fbc02d"
              d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
            />
            <path
              fill="#e53935"
              d="m6.306 14.691 6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
            />
            <path
              fill="#4caf50"
              d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
            />
            <path
              fill="#1565c0"
              d="M43.611 20.083 43.595 20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
            />
          </svg>
          Google
        </button>
      </div>
      {
        loging && <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      }
    </div>
  );
}
