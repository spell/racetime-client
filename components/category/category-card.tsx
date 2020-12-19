import React from "react";
import Link from "next/link";
import {Category} from "../../lib/category";

import styles from "../../styles/components/category/category-card.module.scss";

export interface CategoryCardProps {
    category: Category;
}

export default function CategoryCard(props: CategoryCardProps) {
    return (
        <div className={styles.shell}>
            <div className={styles.card} style={{backgroundImage: props.category.image}} />
            <span className={styles.name}>{props.category.name}</span>
        </div>
    );
}
