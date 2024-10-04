import styles from "./tabs.module.css";
import { MdPedalBike } from "react-icons/md";
import { BsExclamation } from "react-icons/bs";
import { PiMagnifyingGlassDuotone } from "react-icons/pi";
import { BiDonateHeart } from "react-icons/bi";

export default function Tabs() {
    return (
        <div className={styles.container}>
            <div className={[styles.tab, styles.tab_border].join(' ')}>
                <MdPedalBike />
                <BsExclamation className="absolute bottom-4 right-1 text-gray-600" />
            </div>
            <div className={[styles.tab, styles.tab_border].join(' ')}>
                <PiMagnifyingGlassDuotone />
            </div>
            <div className={styles.tab}>
                <BiDonateHeart />
            </div>
        </div>
    )
}