import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React from 'react';

import styles from "../styles/pages/home.module.scss";
import {faArrowRight} from "@fortawesome/free-solid-svg-icons";
import {GetServerSideProps} from "next";
import Axios from "axios";
import {CategoryStats} from "../lib/category";
import CategoryCard from "../components/category/category-card";
import {HalPaginatedResponse} from "../lib/hal";

interface HomeProps {
    popularCategories: CategoryStats[];
}

export default function Home(props: HomeProps) {
    return (
        <div>
            <div className={styles.greeting}>
                <div className={styles.left}>
                    <h2 className={styles.heading}>The place to race</h2>
                    <p>This is <span className={styles.brand}>racetime.gg</span>, a modern, sleek and user-friendly
                        system that lets anyone and everyone race video games online. We're here to make speedrunning
                        better with an open source, community driven site that anyone can use.</p>
                    <button className={styles.cta}>Get started today!</button>
                </div>
                <div className={styles.brandLogo}>
                    <img src="/icon.svg"/>
                </div>
                <div className={styles.spacer}/>
            </div>

            <div>
                <h2 className={styles.smallHeading}>Popular categories</h2>
                <div className={styles.cardCarousel}>
                    {props.popularCategories.slice(0, 10).map(category =>
                        <CategoryCard key={category.slug} category={category} label/>
                    )}
                </div>
                <div className={styles.explore}>
                    <Link href="/category"><a>Explore all categories <FontAwesomeIcon icon={faArrowRight}/></a></Link>
                </div>
            </div>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async (context) => {
    const response = await Axios.get<HalPaginatedResponse<{ categories: CategoryStats[] }>>(
        `${process.env.API_SERVER}/categories`
    );

    console.log(response.data);

    return {
        props: {
            popularCategories: response.data._embedded.categories,
        }
    };
}
