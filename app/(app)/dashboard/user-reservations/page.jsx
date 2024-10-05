'use client';

import { useEffect, useState, useContext } from "react";
import styles from "./styles.module.css";
import { IoMdClose } from "react-icons/io";
import { useRouter } from 'next/navigation';
import { LoadingContext } from "@/app/lib/Context";
import { findBikes, findBikeApplicationById } from "@/app/lib/mongoDB";

export default function Page() {
    const [reservedBikes, setReservedBikes] = useState([]);
    const [reservedBikeApps, setReservedBikeApps] = useState([]);
    const [openBikeProfile, setOpenBikeProfile] = useState(null);

    const router = useRouter()
    const {setLoading} = useContext(LoadingContext);
    
    useEffect(()=>{
        function updatePage(bike_arr, app_arr) {
            setLoading(false);
            setReservedBikes(bike_arr);
            setReservedBikeApps(app_arr);
        }

        async function initialize() {
            let bikes = await findBikes("bob");
            let bikeReservations = [];
            for (let i=0; i<bikes.length; i++) {
                const bikeApplicationId = bikes[i].bikeApplicationId;
                bikeReservations.push(await findBikeApplicationById(bikeApplicationId));
            }
            updatePage(bikes, bikeReservations);
        }
        initialize()
    }, [])
    return (
        <div className={styles.page}>
            {reservedBikeApps.length!=0 && <div>
                <div className={styles.subheading}>Your Reservations:</div>
                <div className={styles.list}>
                    {reservedBikeApps.map((app, index)=>{ return (
                        <div key={`donatePage-pendingapp${index}`} className={styles.item}>
                            <img src={app.imageUri} width={150} height={150} />
                            <text className={styles.itemText}>{app.description}</text>
                            <text className={styles.itemText}>Pickup location: 
                                <text className="underline text-purple-500">{reservedBikes[index].location}</text>
                            </text>
                            <div className={styles.itemBttnDiv}>
                                <button className={styles.itemBttn} onClick={()=>{setOpenBikeProfile(reservedBikes[index])}}>I am at the pickup location!</button>
                            </div>
                            <div className={styles.itemBttnDiv}>
                                <button className={styles.itemDelete} onClick={() => {setLoading(true); router.push(`/dashboard/user-reservations/return-bike/${reservedBikes[index]._id}`);}}>
                                    <text>Return Bike</text>
                                    <IoMdClose />
                                </button>
                            </div>
                        </div> )})}
                </div>
            </div>}

            <div className={styles.headerDiv}>
                <text className={styles.header}>See bikes you have reserved on this page!</text>
            </div>

            {openBikeProfile!=null && <div className={styles.modal}>
                <button className={styles.modalClose} onClick={()=>{setOpenBikeProfile(null)}}><IoMdClose />Close</button>
                <div className={styles.profile}>
                    <text className={styles.profileText}>{`Location: ${openBikeProfile.location}`}</text>
                    <img src={openBikeProfile.helperImageUri} width={300} height={300} className={styles.imageUri} />
                    <text className={styles.profileText}>{`Location Description: ${openBikeProfile.locDescription}`}</text>
                    <text className={styles.profileText}>{`Bike Lock Code: ${openBikeProfile.bikeLockCode}`}</text>
                </div>
            </div>}
        </div>
    )
}