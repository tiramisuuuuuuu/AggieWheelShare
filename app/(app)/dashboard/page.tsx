import ResultsList from "@/app/ui/resultsList";
import styles from "./styles.module.css";

export default function Home() {
    return (
        <div className={styles.page}>
            <div className={styles.locationDiv}>Viewing Location: <text className="underline text-purple-500">Davis</text></div>
            <ResultsList />
            <div style={{height: '2000px'}}></div>
        </div>
    )
}