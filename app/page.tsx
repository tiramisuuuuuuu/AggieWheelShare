'use client';

import { useRouter } from 'next/navigation';
import styles from "./styles.module.css";
import { GiDutchBike } from "react-icons/gi";
import { useState } from 'react';

export default function Home() {
    const router = useRouter()
    const [loading, setLoading] = useState(false);

    return (
        <div className={styles.page}>
            <text className={styles.header}>Welcome to AggieWheelShare, a website where Aggies can find bikes that can be freely used for extended periods of time or where you can donate your own bike to the system!</text>
            <button onClick={()=>{ setLoading(true); router.push("/dashboard") }} className={styles.bttn}>
                Sign In To Get Started!
                <GiDutchBike />
            </button>
            {loading && <div className="fixed top-0 w-screen h-screen bg-gray-500 bg-opacity-70 flex justify-center items-center text-2xl">
                <text className="animate-pulse">Loading</text>
                <GiDutchBike className="text-4xl animate-pulse" />
          </div>}
        </div>
    )
}