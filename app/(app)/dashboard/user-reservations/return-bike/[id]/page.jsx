'use client';

import { useEffect, useState, useContext } from "react";
import styles from "./styles.module.css";
import { LoadingContext } from "@/app/lib/Context";
import { FaRegCircle, FaRegCircleDot } from "react-icons/fa6";
import { GiDutchBike } from "react-icons/gi";
import { useRouter } from 'next/navigation';
import { updateBike, unreserveBike, findBikeById } from "@/app/lib/mongoDB";

const locationsList = ["Silo", "Memorial Union", "Library"]

export default function Page({ params }) {
    const [bikeProfile, setBikeProfile] = useState({});
    const [loc, setLoc] = useState("");
    const [submitLoading, setSubmitLoading] = useState(false);
    const [error, setError] = useState([]);
    const {setLoading} = useContext(LoadingContext);
    const [showForm, setShowForm] = useState(true);
    const [didNotPickUp, setDidNotPickup] = useState(false);
    const router = useRouter()

    function submit_handler() {
        const description = document.getElementById("description_input").value;
        const imageUri = document.getElementById("imageUri_input").value;
        const bikeLockCode = document.getElementById("bikeLockCode_input").value;
        let temp_err = []
        if (description=="" || loc=="" || bikeLockCode=="") {
            console.log(description)
            console.log(imageUri)
            console.log(bikeLockCode)
            temp_err.push("parameters")
            }
        setError(temp_err);
        if (temp_err.length==0) {
            setLoading(true);
            setSubmitLoading(true);
        }
    }

    useEffect(()=>{
        async function returnBike() {
            await unreserveBike(bikeProfile._id);
            router.push("/dashboard/user-reservations");
        }

        if (didNotPickUp) { returnBike() }
    }, [didNotPickUp])

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
            const response = await updateBike(bikeProfile._id, loc, description, imageUri, bikeLockCode);
            if (response) {
                router.push("/dashboard/user-reservations");
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
            setBikeProfile(obj)
        }

        async function initialize () {
            updatePage(await findBikeById(params.id))
        }
        initialize();
    }, [params.id])
    return (
        <div className={styles.page}>
            {showForm && <div className={styles.form}>
                <div className={styles.formElement}>
                    <text>Select a dropoff location: <text className="text-red-500">*</text></text>
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
                </div>
            </div>}

                        
            {(showForm && error.includes("parameters")) && <div className={styles.error}>Failed to submit: Missing 1 or more required parameters</div>}
            {(showForm && error.includes("network")) && <div className={styles.error}>Failed to submit: Network issue</div>}

            {showForm && <div className={styles.headerDiv}>
                <text className={styles.header}>Dropoff and lock your bike within the chosen location radius to complete the return process:</text>
            </div>}

            {!showForm && <button className={styles.submit} onClick={()=>{setLoading(true); setDidNotPickup(true)}}>
                Submit
                <GiDutchBike />
            </button>}
            <div className={styles.form}>
                <text>Are you trying to return this bike w/o ever having picked it up?</text>
                <button onClick={()=>{setShowForm(true)}} className="flex flex-row items-center gap-x-2.5">
                    {!showForm ? <FaRegCircle /> : <FaRegCircleDot />}
                    No
                </button>
                <button onClick={()=>{setShowForm(false)}} className="flex flex-row items-center gap-x-2.5">
                    {showForm ? <FaRegCircle /> : <FaRegCircleDot />}
                    Yes
                </button>
            </div>
        </div>
    )
}