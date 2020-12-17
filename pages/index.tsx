import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React from 'react';

import styles from "../styles/pages/home.module.scss";
import {faArrowRight} from "@fortawesome/free-solid-svg-icons";

export default function Home() {
    return (
        <div>
            <div className={styles.greeting}>
                <div className={styles.left}>
                    <h2 className={styles.heading}>The place to race</h2>
                    <p>This is <span className={styles.brand}>racetime.gg</span>, a modern, sleek and user-friendly
                        system that lets anyone and everyone race video games online. We're here to make speedrunning
                        better with an open source, community driven site that anyone can use. We hope you like it!</p>
                    <button className={styles.cta}>Get started today!</button>
                </div>
                <div className={styles.brandLogo}>
                    <img src="/icon.svg" />
                </div>
                <div className={styles.spacer} />
            </div>

            <div className={styles.popularCategories}>
                <h2 className={styles.smallHeading}>Popular categories</h2>
                <div className={styles.cardCarousel}>
                    <div className={styles.card} style={{backgroundImage: "url('/fixtures/alttpr.png')"}} />
                    <div className={styles.card} style={{backgroundImage: "url('/fixtures/zootr.png')"}}/>
                    <div className={styles.card} style={{backgroundImage: "url('/fixtures/oot.jpg')"}} />
                    <div className={styles.card} style={{backgroundImage: "url('/fixtures/mmr.jpg')"}} />
                    <div className={styles.card} style={{backgroundImage: "url('/fixtures/twwr.jpg')"}} />
                </div>
                <div className={styles.explore}>
                    <Link href="/category"><a>Explore all categories <FontAwesomeIcon icon={faArrowRight} /></a></Link>
                </div>
            </div>
        </div>
    )
}
