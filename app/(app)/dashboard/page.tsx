'use client';

import styles from "./styles.module.css";
import { useEffect, useState, useContext } from "react";
import { useRouter } from 'next/navigation';
import { LoadingContext } from "@/app/lib/Context";
import { getBikeAppIds, findBikeApplicationById, reserveBike } from "@/app/lib/mongoDB";
import { IoMdClose } from "react-icons/io";

export default function Home() {
    const [availableList, setAvailableList] = useState([]);
    const [reservedList, setReservedList] = useState([]);
    const [askConfirmation, setAskConfirmation] = useState(null);
    const router = useRouter()
    const {loading, setLoading} = useContext(LoadingContext);
    const [error, setError] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(false);


    useEffect(()=> {
        function updateErrors() {
            setLoading(false);
            setError(true);
            setAskConfirmation(null);
        }

        async function submit() {
            const response = await reserveBike("bob", askConfirmation._id);
            if (response) {
                router.push("/dashboard/user-reservations");
                }
            else {
                updateErrors();
            }
        }

        if (submitLoading) { submit() }
    }, [submitLoading])

    useEffect(()=>{
        function updatePage(available_list, reserved_list) {
            setLoading(false);
            setAvailableList(available_list);
            setReservedList(reserved_list);
        }

        async function initialize () {
            const resultsObj = await getBikeAppIds();
            let available_list = [];
            let reserved_list = [];
            for (let i=0; i<resultsObj.reserved.length; i++) {
                reserved_list.push(await findBikeApplicationById(resultsObj.reserved[i]));
            }
            for (let i=0; i<resultsObj.available.length; i++) {
                available_list.push(await findBikeApplicationById(resultsObj.available[i]));
            }
            updatePage(available_list, reserved_list);
        }
        if (!submitLoading) { initialize() }
    }, [submitLoading])
    return (
        <div className={styles.page}>
            <div className={styles.locationDiv}>Viewing Location: <text className="underline text-purple-500">Davis</text></div>
            {error && <div className={styles.error}>Failed to reserve: An error occurred</div>}
            
            <div className={styles.resultsList}>
                {availableList.map((bikeProfile, index)=>{return (
                    <div key={`availableBike_${index}`} className={styles.item}>
                        <img src={bikeProfile.imageUri} width={250} height={250} />
                        <text className={styles.itemText}>{`Description: ${bikeProfile.description}`}</text>
                        <button className={styles.itemBttn} onClick={()=>{setAskConfirmation(bikeProfile)}}>Reserve</button>
                    </div> )})}
                {reservedList.map((bikeProfile, index)=>{return (
                    <div key={`reservedBike_${index}`} className={[styles.item, styles.darkBg].join(' ')}>
                        <img src={bikeProfile.imageUri} width={250} height={250} />
                        <text className={styles.itemText}>{`Description: ${bikeProfile.description}`}</text>
                        <button className={[styles.itemBttn, styles.darkBttn].join(' ')} disabled={true}>Unavailable</button>
                    </div> )})}
            </div>
            {askConfirmation!=null && <div className={styles.modal}>
                <button className={styles.modalClose} onClick={()=>{setAskConfirmation(null)}}><IoMdClose />Close</button>
                <div className={styles.profile}>
                    <img src={askConfirmation.imageUri} width={300} height={300} className={styles.profileImg} />
                    <text className={styles.profileText}>{`Description: ${askConfirmation.description}`}</text>
                    <text className={styles.profileText}>Note:</text>
                    <ul className={styles.profileText}>
                        <li>Bike will be available immediately!</li>
                        <li>Bike pickup will be available for only 48 hours.</li>
                        <li>When you are ready to pick up the bike, please open the Your-Reservation page (you will be initially redirected after reserving) and click 'I am at pickup location'.</li>
                        <li>Please return bike as soon as possible, using the app, to allow the community to continue using it!</li>
                    </ul>
                    <button className={styles.itemBttn} onClick={()=>{setLoading(true); setSubmitLoading(true);}}>Confirm Reserve</button>
                </div>
            </div>}
        </div>
    )
}