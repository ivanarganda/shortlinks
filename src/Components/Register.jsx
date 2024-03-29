import { Link, useNavigate } from "react-router-dom";
import AuthGoogle from "./AuthCredentials";
import useFadeIn from "../hooks/state/useFadeIn";
import React,{ useState , useMemo , useContext } from 'react';
import { AuthContext } from "../Context/authContext";
import { MsgContext } from "../Context/messageContext";

export default function Login() {

  const [Section] = useMemo(()=>useFadeIn(true),[]);

  const [credentials , setCredentials] = useState({
    name:'',
    username:'',
    password:''
  });

  const { registerUserSubmit , errors } = useContext(AuthContext);
  const { useMessage } = useContext(MsgContext);
  const navigate = useNavigate(null);

  const handleChange = ( event )=>{

    const { name , value }  = event.target;
    setCredentials({...credentials , [name]:value});

  }

  const handleFormSubmit = async ( event )=>{
    const isRegistered = await registerUserSubmit( event);
    if (isRegistered){
      useMessage(`Registered ${credentials.email}. Redirecting to login`, 'success', 2000, 'top', 'center');
      setTimeout(()=>{
        navigate('/login');
      },2000);
    }
  }

  return ( 
    <Section>
      <div className="p-8 lg:w-1/2 mx-auto min-w-[350px]">
        <AuthGoogle />
        <div className="bg-gray-100 rounded-b-lg py-12 px-4 lg:px-24">
          <p className="text-center text-sm text-gray-500 font-light">
            Or sign in with credentials
          </p>
          {
            errors && <p className="text-red-400 font-bold mt-5 text-xl">{errors}</p>
          }
          <form onSubmit={handleFormSubmit} className="mt-6">
          <div className="relative">
              <input
                className="appearance-none border pl-12 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600 transition rounded-md w-full py-3 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline"
                id="name"
                name="name"
                type="text"
                placeholder="Full name"
                onChange={handleChange}
                value={credentials.name}
              />
              <div className="absolute left-0 inset-y-0 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7 ml-3 text-gray-400 p-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </div>
            </div>
            <div className="relative mt-3">
              <input
                className="appearance-none border pl-12 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600 transition rounded-md w-full py-3 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline"
                id="username"
                name="username"
                type="text"
                placeholder="Email"
                onChange={handleChange}
                value={credentials.email}
              />
              <div className="absolute left-0 inset-y-0 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7 ml-3 text-gray-400 p-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </div>
            </div>
            <div className="relative mt-3">
              <input
                className="appearance-none border pl-12 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600 transition rounded-md w-full py-3 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline"
                id="password"
                name="password"
                type="text"
                placeholder="Password"
                onChange={handleChange}
                value={credentials.password}
              />
              <div className="absolute left-0 inset-y-0 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7 ml-3 text-gray-400 p-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10 2a5 5 0 00-5 5v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2H7V7a3 3 0 015.905-.75 1 1 0 001.937-.5A5.002 5.002 0 0010 2z" />
                </svg>
              </div>
            </div>
            <div className="mt-4 flex items-center text-gray-500">
              <span>
                Do you have already account? <Link to="/login">Sign in</Link>
              </span>
            </div>
            <div className="flex items-center justify-center mt-8">
              <button className="text-white py-2 px-4 uppercase rounded bg-indigo-500 hover:bg-indigo-600 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </Section>
  );
}
