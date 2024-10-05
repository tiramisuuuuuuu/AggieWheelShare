'use client';

import { useEffect, useState, useContext } from "react";
import styles from "./styles.module.css";
import { LoadingContext } from "@/app/lib/Context";
import { FaRegCircle, FaRegCircleDot } from "react-icons/fa6";
import { GiDutchBike } from "react-icons/gi";
import { useRouter } from 'next/navigation';
import { insertBike, findBikeApplicationById, closeBikeApplication } from "@/app/lib/mongoDB";

const locationsList = ["Silo", "Memorial Union", "Library"]

export default function Page({ params }: { params: { id: string } }) {
    const [app, setApp] = useState({});
    const [loc, setLoc] = useState("");
    const [submitLoading, setSubmitLoading] = useState(false);
    const [error, setError] = useState([]);
    const {setLoading} = useContext(LoadingContext);
    const router = useRouter()

    function submit_handler() {
        const description = document.getElementById("description_input").value;
        const imageUri = document.getElementById("imageUri_input").value;
        const bikeLockCode = document.getElementById("bikeLockCode_input").value;
        let error = []
        if (description=="" || loc=="" || bikeLockCode=="") {
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
            const bikeLockCode = document.getElementById("bikeLockCode_input").value;
            const response = await insertBike(app._id, loc, description, imageUri, bikeLockCode);
            if (response) {
                await closeBikeApplication(app._id);
                router.push("/dashboard/donate-a-bike");
                }
            else {
                reportError();
                }
        }

        if (submitLoading) { submit();}
    }, [submitLoading])

    useEffect(()=>{
        function updatePage(obj) {
            setLoading(false);
            setApp(obj)
        }

        async function initialize () {
            updatePage(await findBikeApplicationById(params.id))
        }
        initialize();
    }, [params.id])
    return (
        <div className={styles.page}>
            <div className={styles.form}>
                <div className={styles.formElement}>
                    <text>Confirm dropoff location or select a different one: <text className="text-red-500">*</text></text>
                    <div>
                        {locationsList.map((location, index)=>{return(
                            <button className={styles.listItem} key={`donationPage_loc${index}`} onClick={()=>{setLoc(location)}}>
                                {loc!=location ? <FaRegCircle /> : <FaRegCircleDot />}
                                {location}
                            </button> )})}
                    </div>
                </div>
                <div className={styles.formElement}>
                    <text>Upload bike location image:</text>
                    <input id="imageUri_input" className={styles.imageUri} placeholder="Enter Image Url"/>
                </div>
                <div className={styles.formElement}>
                    <text>Location description <text className="text-red-500">*</text></text>
                    <textarea id="description_input" className={styles.description} placeholder="Describe how to find bike"/>
                </div>
                <div className={styles.formElement}>
                    <text>Please lock bike at location and enter lock code below: <text className="text-red-500">*</text></text>
                    <input id="bikeLockCode_input" className={styles.imageUri} placeholder="Enter bike lock code"/>
                </div>
                <div className={styles.submitDiv}>
                    <button className={styles.submit} onClick={()=>{submit_handler()}}>
                        Submit
                        <GiDutchBike />
                    </button>
                    <text className="text-gray-400 max-w-sm">Thank you for your donation!</text>
                </div>
            </div>

            <div className={styles.item}>
                <img src={app.imageUri} width={250} height={250} />
                <text className={styles.itemText}>{app.description}</text>
                <text className={styles.itemText}>Selected dropoff location: 
                    <text className="underline text-purple-500">{app.location}</text>
                </text>
            </div>
            
            {error.includes("parameters") && <div className={styles.error}>Failed to submit: Missing 1 or more required parameters</div>}
            {error.includes("network") && <div className={styles.error}>Failed to submit: Network issue</div>}

            <div className={styles.headerDiv}>
                <text className={styles.header}>Dropoff and lock your bike within location radius to complete the donation process:</text>
            </div>
        </div>
    )
}