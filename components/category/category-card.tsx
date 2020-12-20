import React from "react";
import Link from "next/link";
import {Category} from "../../lib/category";

import styles from "../../styles/components/category/category-card.module.scss";

export interface CategoryCardProps {
    category: Category;
    label?: boolean;
}

export default function CategoryCard(props: CategoryCardProps) {
    return (
        <Link href={`/categories/${props.category.slug}`}><a>
            <div className={styles.shell}>
                {props.category.image
                    ? (
                        <div className={styles.card} style={{backgroundImage: `url("${props.category.image}")`}}/>
                    ) : (
                        <div className={styles.card}>
                            <div className={styles.shortName}>{props.category.short_name}</div>
                        </div>
                    )}
                <div className={styles.label}>
                    {props.label &&
                    <span title={props.category.name} className={styles.name}>{props.category.name}</span>}
                </div>
            </div>
        </a></Link>
    );
}
