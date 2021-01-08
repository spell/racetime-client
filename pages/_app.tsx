import React from "react";
import cookie from "cookie";
import Navigation from "../components/navigation";

import { SSRKeycloakProvider, SSRCookies } from "@react-keycloak/ssr";

import "tailwindcss/tailwind.css";
import "../styles/globals.scss";
import "../styles/ui.scss";
import Footer from "../components/footer";
import { AppProps } from "next/app";
import { GetServerSideProps } from "next";
import { IncomingMessage } from "http";

const keycloakConfig = {
    realm: process.env.NEXT_PUBLIC_KEYCLOAK_REALM,
    url: process.env.NEXT_PUBLIC_KEYCLOAK_SERVER,
    clientId: process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID,
}

interface InitialProps {
    cookies: unknown;
}

export default function MyApp({ Component, pageProps, cookies }: AppProps & InitialProps) {
    return (
        <SSRKeycloakProvider persistor={SSRCookies(cookies)} keycloakConfig={keycloakConfig}>
            <div id="application">
                <nav>
                    <Navigation />
                </nav>
                <main>
                    <Component {...pageProps} />
                </main>
                <footer>
                    <Footer />
                </footer>
            </div>
        </SSRKeycloakProvider>
    );
}

const parseCookies = (req?: IncomingMessage) => {
    if (!req || !req.headers) {
        return {};
    }
    return cookie.parse(req.headers.cookie || '');
}

export const getServerSideProps: GetServerSideProps<InitialProps> = async context => {
    return {
        props: {
            cookies: parseCookies(context.req),
        }
    }
}
