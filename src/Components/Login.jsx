import { Link } from "react-router-dom";
import AuthGoogle from "./AuthCredentials";
import useFadeIn from "../hooks/state/useFadeIn";
import React,{ useState , useMemo , useContext } from 'react';
import { AuthContext } from "../Context/authContext";
import { Backdrop , CircularProgress } from "@mui/material";
import { MsgContext } from "../Context/messageContext";


export default function Login() {

  const [Section] = useMemo(()=>useFadeIn(true),[]);

  const [credentials , setCredentials] = useState({
    username:'',
    password:''
  });
  const { loginUserSubmit , errors , setSession } = useContext(AuthContext);
  const { useMessage } = useContext(MsgContext);
  const [ isLogging , setIsLogging ] = useState(false);

  const handleChange = ( event )=>{

    const { name , value }  = event.target;
    setCredentials({...credentials , [name]:value});

  }

  const handleFormSubmit = async ( event )=>{
    setIsLogging(true);
    useMessage(`Logging in...`, 'success', 2000, 'top', 'center');
    const isLogged = await loginUserSubmit(event);
    if (isLogged) {
      useMessage(`Logged in as ${name}. Redirecting...`, 'success', 2000, 'top', 'center');
      setTimeout(() => {
        setIsLogging(false);
        localStorage.setItem('auth', JSON.stringify(isLogged[0]));
        setSession(isLogged[0]);
      }, 3000);
    } else { 
      setIsLogging(false);
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
              <input
                type="checkbox"
                id="remember"
                name="remember"
                className="mr-3"
              />
              <label htmlFor="remember">Remember me</label>
            </div>
            <div className="mt-4 flex items-center text-gray-500">
              <span>
                Don´t you have account yet? <Link to="/register">Sign up</Link>
              </span>
            </div>
            <div className="flex items-center justify-center mt-8">
              <button className="text-white py-2 px-4 uppercase rounded bg-indigo-500 hover:bg-indigo-600 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
      {isLogging && (
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true}>
          <CircularProgress color="inherit" />
        </Backdrop> 
      )}
    </Section>
  );
}
