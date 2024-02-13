import React from 'react';
import Resume from './Resume'; 
import useFadeIn from '../hooks/state/useFadeIn';
import { motion, useScroll } from "framer-motion";

export default function Header() {

  const { scrollYProgress } = useScroll();
  const [ Section ] = useFadeIn();

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-green-500"
        style={{ scaleX: scrollYProgress }}
      />
      <div className='min-w-[350px]'>
        <h1 className="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">We offer you, shorted links</h1>
        <p className="mb-6 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-300">They facility to understand their aim and main function.You could search shorted links available and save them your profile and sign in to create your own shorted links</p>
        <a href="#" className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
            Get started
            <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
        </a>
        <Section>
            <Resume />
        </Section>
      </div> 
    </>
  )
}
