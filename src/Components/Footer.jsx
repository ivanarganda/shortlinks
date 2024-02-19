import link from './../assets/link.jpg';
import { FaGithub } from 'react-icons/fa';
import { FaLinkedin } from 'react-icons/fa';
import { FaWhatsapp } from 'react-icons/fa';

export default function Footer() {
  return (
    <div className={`relative w-full min-w-[350px] left-0 bottom-0 items-center text-purple-400`}>
      <div className="relative w-full mt-16 bg-[#030637]">
        <svg
          className="absolute top-0 w-full h-6 -mt-5 sm:-mt-10 sm:h-16 bg-[#030637] rounded-2xl"
          preserveAspectRatio="none"
          viewBox="0 0 1440 54"
        >
          <path
            fill="#030637"
            d="M0 22L120 16.7C240 11 480 1.00001 720 0.700012C960 1.00001 1200 11 1320 16.7L1440 22V54H1320C1200 54 960 54 720 54C480 54 240 54 120 54H0V22Z"
          ></path>
        </svg>
        <div className="px-4 pt-12 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
          <div className="grid gap-16 row-gap-10 mb-8 lg:grid-cols-1 flex flex-row justify-center w-full items-center">
            <div className="flex flex-col h-40 lg:h-auto lg:flex-row justify-around items-center">
              <span className="ml-2 font-bold tracking-wide text-gray-100 flex flex-row gap-2 items-center">
                <img src={link} alt="" className="ratio-[1/2] w-10 h-10" />
                <span className='text-2xl'>Shorted links</span>
              </span>
              <ul className="w-full lg:max-w-sm flex flex-row justify-around items-center">
                <li className="list-none list__options">
                  <a
                    href="https://ivanarganda.github.io/ivanarganda/"
                    aria-label="Repository of github where I place projects about development to me"
                    className='hover:text-gray-100'
                  >
                    <FaGithub style={{fontSize:'30px'}} />
                  </a>
                </li>
                <li className="list-none list__options">
                  <a
                    href="https://www.linkedin.com/in/ivan-gonzalez-a41461121/"
                    aria-label="My profile of linkedin"
                    className='hover:text-gray-100'
                  >
                    <FaLinkedin style={{fontSize:'30px'}} />
                  </a>
                </li>
                <li className="list-none list__options">
                  <a
                    href="https://web.whatsapp.com/tel=+34657203570"
                    aria-label="My whatsapp contact where you can chat on me"
                    className='hover:text-gray-100'
                  >
                    <FaWhatsapp style={{fontSize:'30px'}} />
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col justify-center pt-5 pb-10 border-t border-gray-500 sm:flex-row">
            <p className="text-sm text-gray-100">
              © Copyright {new Date().getFullYear()} Ivan González Valles. All
              rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
