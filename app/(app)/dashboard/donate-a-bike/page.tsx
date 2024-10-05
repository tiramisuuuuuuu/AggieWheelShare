'use client';

import { useEffect, useState, useContext } from "react";
import styles from "./styles.module.css";
import { IoIosAddCircleOutline, IoMdClose } from "react-icons/io";
import { useRouter } from 'next/navigation';
import { LoadingContext } from "@/app/lib/Context";
import { findBikeApplications } from "@/app/lib/mongoDB";

export default function Page() {
    const [pendingApplications, setPendingApplications] = useState([]);
    const router = useRouter()
    const {loading, setLoading} = useContext(LoadingContext);
    
    useEffect(()=>{
        function updatePage(arr) {
            setLoading(false);
            setPendingApplications(arr);
        }

        async function initialize() {
            updatePage(await findBikeApplications("bob"));
        }
        initialize()
    }, [])
    return (
        <div className={styles.page}>
            {pendingApplications.length!=0 && <div>
                <div className={styles.subheading}>Unfinished Applications:</div>
                <div className={styles.list}>
                    {pendingApplications.map((app, index)=>{ return (
                        <div key={`donatePage-pendingapp${index}`} className={styles.item}>
                            <img src={app.imageUri} width={150} height={150} />
                            <text className={styles.itemText}>{app.description}</text>
                            <text className={styles.itemText}>Selected dropoff location: 
                                <text className="underline text-purple-500">{app.location}</text>
                            </text>
                            <div className={styles.itemBttnDiv} onClick={() => {setLoading(true); router.push(`/dashboard/donate-a-bike/submit-dropoff/${app._id}`);}}>
                                <button className={styles.itemBttn}>Begin dropoff process</button>
                            </div>
                            <div className={styles.itemBttnDiv}>
                                <button className={styles.itemDelete}>
                                    <text>Delete</text>
                                    <IoMdClose />
                                </button>
                            </div>
                        </div> )})}
                </div>
            </div>}

            {pendingApplications.length==0 && <div>
                <div>
                    <text className={styles.defaultText}>Would you like to donate a bike + bike lock to the Davis community? (2 Steps!)</text>
                    <ul className={styles.defaultText}>
                        <li>Upload a photo of the bike, add a description of the model, & select a dropoff location to lock bike at</li>
                        <li>Submit bike + bike lock + lock code to AggieWheelShare system only at or after dropoff time!</li>
                    </ul>
                </div>
                <button className={styles.headerBttn} onClick={()=>{setLoading(true); router.push("/dashboard/donate-a-bike/start-application");}}>Submit a bike to donate!</button>
            </div>}

            <div className={styles.headerDiv}>
                <text className={styles.header}>Donate A Bike!</text>
                {pendingApplications.length!=0 && <button className={styles.headerBttn} onClick={()=>{setLoading(true); router.push("/dashboard/donate-a-bike/start-application");}}>
                    <text className="text-base">Start a new application</text>
                    <IoIosAddCircleOutline />
                </button>}
            </div>
        </div>
    )
}