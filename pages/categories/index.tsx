import React from "react";
import GridView from "../../components/ui/grid-view";
import {Category} from "../../lib/category";
import {HalPaginatedResponse} from "../../lib/hal";
import Axios from "axios";
import CategoryCard from "../../components/category/category-card";

export default function Categories() {
    const getPage = async (page: number) => {
        const response = await Axios.get<HalPaginatedResponse<{categories: Category[]}>>(
            `${process.env.NEXT_PUBLIC_API_SERVER}/categories?page=${page}`
        );

        return {
            data: response.data._embedded.categories,
            hasPrev: false,
            hasNext: false,
        }
    }

    return (
        <React.Fragment>
            <GridView component={(props) => (<CategoryCard category={props.data}/>)}
                      initialPage={1} loadPage={getPage}/>
        </React.Fragment>
    )
}
