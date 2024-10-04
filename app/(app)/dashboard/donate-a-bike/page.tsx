'use client';

import { useEffect, useState } from "react";
import styles from "./styles.module.css";

const apps = [{imageUri: "https://images.offerup.com/wSDsag2YjVsdb5j2sCLz-QCtzlk=/250x250/b691/b6919ad4d07a4a10abce16ba7aee9efb.jpg",
    description: "black bike w/ purple seat", 
    location: "Silo"}]

export default function Home() {
    const [pendingApplications, setPendingApplications] = useState([]);
    
    useEffect(()=>{
        async function initialize() {
            setPendingApplications(apps);
        }
        initialize()
    }, [])
    return (
        <div className={styles.page}>
            {pendingApplications.length!=0 && <div>Unfinished Bike Donations:</div>}
            {pendingApplications.map((app, index)=>{ return (
                <div key={`donatePage-pendingapp${index}`}>
                    <img src={app.imageUri} width={150} height={150} />
                    <text>{app.description}</text>
                    <text>{`Selected dropoff location: ${app.location}`}</text>
                    <button>I am at the dropoff location!</button>
                    <button>Delete</button>
                </div>
            )})}
            {pendingApplications.length==0 && <div>
                <text>Would you like to donate a bike + bike lock to the Davis community? (2 Steps!)
                    <text>Upload a photo of the bike, add a description of the model, & select a dropoff location to lock bike at</text>
                    <text>Submit bike + bike lock + lock code to AggieWheelShare server only at or after dropoff time!</text>
                </text>
            </div>}
            <button>Submit a bike to donate!</button>
            <div style={{height: '2000px'}}></div>
        </div>
    )
}