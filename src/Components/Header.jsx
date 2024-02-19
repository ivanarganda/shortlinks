import { motion, useScroll } from "framer-motion";
import { useContext, useState } from "react";
import { AuthContext } from './../Context/authContext'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import useFadeIn from './../hooks/state/useFadeIn'

export default function Header() {
  const { scrollYProgress } = useScroll();
  const { session, logOut } = useContext(AuthContext);
  const [Section] = useFadeIn();
  const [hidden, setHidden] = useState(true);

  const renderUserImage = () => {
    if (session && session.picture) {
      return (
        <img
          src={session.picture}
          className='rounded-full h-20 w-20'
          alt='user image'
        />
      );
    } else {
      return (
        <AccountCircleIcon
          className='h-full mt-2'
          sx={{ fontSize: '80px', color: 'white' }}
        />
      );
    }
  };

  const toggleDropdown = () => {
    setHidden(!hidden);
  };

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-purple-500"
        style={{ scaleX: scrollYProgress }}
      />
      <div className='min-w-[350px]'>
        <h1 className="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-200 md:text-5xl lg:text-6xl dark:text-white">We offer you, shorted links</h1>
        <p className="mb-6 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-300">They facility to understand their aim and main function.You could search shorted links available and save them your profile and sign in to create your own shorted links</p>
        <div className="flex flex-row flex-flow m-auto items-center justify-center w-full gap-10">
          <a href="#" className="inline-flex items-center flex-1-auto mt-4 self-start flex-grow-0 justify-center px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
            Get started
            <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
            </svg>
          </a>
          <figure className="cursor-pointer relative" onClick={toggleDropdown}>
            {session && renderUserImage()}
            <Section>
              <ul className={`absolute top-20 -right-10 bg-gray-200 w-40 z-20 rounded-xl shadow-xl ${hidden ? 'hidden' : 'block'}`}>
                <li className={`text-gray-600 p-2 hover:font-bold hover:bg-blue-200 rounded-xl transition-all`} onClick={logOut}>Sign out</li>
                <li className={`text-gray-600 p-2 hover:font-bold hover:bg-blue-200 rounded-xl transition-all`}>Profile</li>
                <li className={`text-gray-600 p-2 hover:font-bold hover:bg-blue-200 rounded-xl transition-all`}>Settings</li>
              </ul>
            </Section>
          </figure>
        </div>
      </div >
    </>
  )
}
