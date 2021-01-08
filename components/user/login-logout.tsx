import React from "react";
import styles from "../../styles/components/navigation.module.scss";
import Link from "next/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSignOutAlt, faUserEdit} from "@fortawesome/free-solid-svg-icons";
import {useKeycloak} from "@react-keycloak/ssr";
import {KeycloakInstance, KeycloakTokenParsed} from "keycloak-js";

type ParsedToken = KeycloakTokenParsed & {
    email?: string;
    preferred_username?: string;
}

export default function LoginLogout() {
    const {keycloak} = useKeycloak<KeycloakInstance>();
    const parsedToken: ParsedToken | undefined = keycloak.tokenParsed;

    if (keycloak) {
        console.log(keycloak.token);
    }

    return (
        <div className={styles.profile}>
            {keycloak.authenticated ? (
                <React.Fragment>
                    <span className={styles.up}>Hello, {parsedToken?.preferred_username}</span>
                    <a href={keycloak.createAccountUrl()}><FontAwesomeIcon icon={faUserEdit} className={styles.upIcon}/></a>
                    <a href={keycloak.createLogoutUrl()}><FontAwesomeIcon icon={faSignOutAlt}
                                                                          className={styles.upIcon}/></a>
                </React.Fragment>
            ) : (
                <a onClick={() => window.location.href = keycloak && keycloak.createLoginUrl()}>Click to log in</a>
            )}
        </div>
    );
}
