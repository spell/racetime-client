import React from "react";
import Navigation from "../components/navigation";

import "../styles/globals.scss";
import "../styles/ui.scss";
import Footer from "../components/footer";

export default function MyApp({Component, pageProps}) {
    return (
        <div id="application">
            <nav>
                <Navigation/>
            </nav>
            <main>
                <Component {...pageProps} />
            </main>
            <footer>
                <Footer />
            </footer>
        </div>
    );
}

