'use client';

import styles from "./tabs.module.css";
import { MdPedalBike } from "react-icons/md";
import { BsExclamation } from "react-icons/bs";
import { PiMagnifyingGlassDuotone } from "react-icons/pi";
import { BiDonateHeart } from "react-icons/bi";
import { useRouter, usePathname } from 'next/navigation';
import { LoadingContext } from "@/app/lib/Context";
import { useContext } from "react";

export default function Tabs() {
    const router = useRouter();
    const pathname = usePathname();
    const {loading, setLoading} = useContext(LoadingContext);
    console.log(pathname)
    return (
        <div className={styles.container}>
            <button disabled={pathname == "/dashboard/user-reservations"} className={[styles.tab, styles.tab_border].join(' ')} onClick={() => {setLoading(true); router.push("/dashboard/user-reservations");}}>
                <MdPedalBike />
                <BsExclamation className="absolute bottom-4 right-1 text-gray-600" />
            </button>
            <button disabled={pathname == "/dashboard"} className={[styles.tab, styles.tab_border].join(' ')} onClick={() => {setLoading(true); router.push("/dashboard");}}>
                <PiMagnifyingGlassDuotone />
            </button>
            <button disabled={pathname == "/dashboard/donate-a-bike"} className={styles.tab} onClick={() => {setLoading(true); router.push("/dashboard/donate-a-bike");}}>
                <BiDonateHeart />
            </button>
        </div>
    )
}