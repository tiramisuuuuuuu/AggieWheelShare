'use client';

import { GiDutchBike } from "react-icons/gi";
import { useState } from "react";
import { LoadingContext } from '@/app/lib/Context'



export default function RootLayout({children}: Readonly<{children: React.ReactNode;}>) {
  const [loading, setLoading] = useState(false);

  return (
    <div className="w-screen h-screen">
        <LoadingContext.Provider value={{loading, setLoading}}>
          {children}
        </LoadingContext.Provider>
        {loading && <div className="absolute top-0 w-screen h-screen bg-gray-500 bg-opacity-70 flex justify-center items-center text-2xl">
          <text className="animate-pulse">Loading</text>
          <GiDutchBike className="text-4xl animate-pulse" />
          </div>}
      </div>
  );
}
