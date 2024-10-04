import Tabs from "@/app/ui/tabs";
import styles from "./styles.module.css"
import Header from "@/app/ui/header";

export default function Layout({children}) {
    return (
        <div className={styles.container}>
            <div className={styles.main}>
                <Tabs />
                <div className={styles.body}>
                    {children}
                </div>
            </div>
            <Header />
        </div>
    )
}