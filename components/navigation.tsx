import Link from "next/link";
import React from "react";

import styles from "./../styles/components/navigation.module.scss";
import LoginLogout from "./user/login-logout";

export default function Navigation() {
    return (
        <div className={styles.nav}>
            <Link href="/"><a>
                <div className={styles.logo}>
                    <img className={styles.icon} alt="racetime.gg logo" src="/icon.svg"/>
                    <span className={styles.name}>racetime.gg</span>
                </div>
            </a></Link>
            <div className={styles.item}><Link href="/categories">Categories</Link></div>
            <div className={styles.item}>Races</div>
            <span className={styles.spacer}/>
            <LoginLogout />
        </div>
    );
}
