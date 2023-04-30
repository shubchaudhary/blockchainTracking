import "@/styles/globals.css";

import { TrackingProvider } from "@/Context/Tracking";
import { Footer, NavBar } from "@/Components";

export default function App({ Component, pageProps }) {
    return (
        <>
            <TrackingProvider>
                <NavBar />
                <Component {...pageProps} />
                <Footer />
            </TrackingProvider>
        </>
    );
}
