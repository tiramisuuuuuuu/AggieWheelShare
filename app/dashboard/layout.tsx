import Header from "@/app/ui/header";
import Tabs from "@/app/ui/tabs";

export default function Layout({children}) {
    return (
        <div>
            <Header />
            <div>
                <Tabs />
                {children}
            </div>
        </div>
    )
}