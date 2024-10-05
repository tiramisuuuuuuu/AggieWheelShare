'use client';

import styles from "./header.module.css";
import { headerFont } from '@/app/ui/fonts';
import { GiDutchBike } from "react-icons/gi";
import { useState, useEffect } from "react";

export default function Header() {
    const [stickyHeader, setStickyHeader] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
          window.addEventListener("scroll", () =>
            setStickyHeader(window.pageYOffset > 80)
          );
        }
        setStickyHeader(window.pageYOffset > 80);
    }, []);

    return (
        <div>
            {stickyHeader && <div className={styles.stickyHeader}>
                <GiDutchBike />
            </div>}
            {!stickyHeader && <div className={[styles.header, `${headerFont.className} antialiased`].join(' ')}>
                AggieWheelShare
                <GiDutchBike />
            </div>}
        </div>
    )
}