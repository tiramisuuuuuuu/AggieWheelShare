'use client';

import { useRef, useState } from "react";
import styles from "./styles.module.css";

const locationsList = ["Silo", "Memorial Union", "Library"]

export default function Home() {
    const [loc, setLoc] = useState("");
    const description = useRef("");
    const imageUri = useRef("");

    return (
        <div className={styles.page}>
            <input placeholder="Enter Bike Image Url"/>
            <input placeholder="Enter Bike Description"/>
            <text>Select a location to drop off bike w/ lock</text>
            {locationsList.map((loc, index)=>{return(
                <button key={`donationPage_loc${index}`} onClick={()=>{setLoc(loc)}}>{loc}</button>
            )})}
            <div style={{height: '2000px'}}></div>
        </div>
    )
}