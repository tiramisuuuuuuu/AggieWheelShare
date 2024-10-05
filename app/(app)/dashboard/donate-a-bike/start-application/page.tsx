'use client';

import { useEffect, useState, useContext } from "react";
import styles from "./styles.module.css";
import { LoadingContext } from "@/app/lib/Context";
import { FaRegCircle, FaRegCircleDot } from "react-icons/fa6";
import { GiDutchBike } from "react-icons/gi";
import { useRouter } from 'next/navigation';
import { createBikeApplication } from "@/app/lib/mongoDB";

const locationsList = ["Silo", "Memorial Union", "Library"]

export default function Page() {
    const [loc, setLoc] = useState("");
    const [submitLoading, setSubmitLoading] = useState(false);
    const [error, setError] = useState([]);
    const router = useRouter();
    const {loading, setLoading} = useContext(LoadingContext);

    function submit_handler() {
        const description = document.getElementById("description_input").value;
        const imageUri = document.getElementById("imageUri_input").value;
        let error = []
        if (description=="" || loc=="") {
            error.push("parameters")
            }
        setError(error);
        if (error.length==0) {
            setLoading(true);
            setSubmitLoading(true);
        }
    }

    useEffect(()=>{
        function reportError() {
            setError(["network"]);
            setSubmitLoading(false);
            setLoading(false);
        }
        async function submit() {
            const description = document.getElementById("description_input").value;
            const imageUri = document.getElementById("imageUri_input").value;
            const response = await createBikeApplication("bob", description, loc, imageUri);
            if (response) {
                router.push("/dashboard/donate-a-bike");
                }
            else {
                reportError();
                }
        }

        if (!submitLoading) { setLoading(false); }
        else { submit(); }
    }, [submitLoading])

    return (
        <div className={styles.page}>
            <div className={styles.form}>
                <div className={styles.formElement}>
                    <text>Upload bike image</text>
                    <input id="imageUri_input" className={styles.imageUri} placeholder="Enter Bike Image Url"/>
                </div>
                <div className={styles.formElement}>
                    <text>Bike description <text className="text-red-500">*</text></text>
                    <textarea id="description_input" className={styles.description} placeholder="Describe appearance that can help users identify the bike!"/>
                </div>
                <div className={styles.formElement}>
                    <text>Select a location to drop off bike + lock: <text className="text-red-500">*</text></text>
                    <div>
                        {locationsList.map((location, index)=>{return(
                            <button className={styles.listItem} key={`donationPage_loc${index}`} onClick={()=>{setLoc(location)}}>
                                {loc!=location ? <FaRegCircle /> : <FaRegCircleDot />}
                                {location}
                            </button> )})}
                    </div>
                </div>
                <div className={styles.submitDiv}>
                    <button className={styles.submit} onClick={()=>{submit_handler()}}>
                        Submit progress
                        <GiDutchBike />
                    </button>
                    <text className="text-gray-400 max-w-sm">Complete the remaining steps when you are ready to dropoff at the location!</text>
                </div>
            </div>

            {error.includes("parameters") && <div className={styles.error}>Failed to submit: Missing 1 or more required parameters</div>}
            {error.includes("network") && <div className={styles.error}>Failed to submit: Network issue</div>}

            <div className={styles.headerDiv}>
                <text className={styles.header}>Begin bike donation process:</text>
            </div>
        </div>
    )
}