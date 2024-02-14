import React from "react";
import useFadeIn from "../hooks/state/useFadeIn";

export default function GenerateShort({ changeType }) {
  
  const [Section] = useFadeIn(true);

  return (
    <Section>
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
              <div className="h-60 overflow-auto w-full transition:true"></div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
