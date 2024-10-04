'use client';

import { useEffect, useRef, useContext } from "react";
import styles from "./resultsList.module.css";
import { LoadingContext } from "@/app/lib/Context";

export default function ResultsList() {
    let results = [];
    const updateCount = useRef(0);
    const {loading, setLoading} = useContext(LoadingContext);

    useEffect(()=>{
        async function fetchData() {
            //await setLoading(true);
            await new Promise(resolve => setTimeout(resolve, 5000));
            //await setLoading(false);
        }

        fetchData();
    }, [updateCount.current])

    return (
        <div>
            {results.map((result, index)=>{return (
                <div key={`result${index}`}></div>
            )})}
        </div>
    )
}