import React from "react";
import debounce from "lodash.debounce";

export interface GridViewItemProps<T> {
    data: T;
}

export interface GridViewProps<T> {
    /**
     * The initial page number of the shown data.
     */
    initialPage: number;

    /**
     * loadPage is a callback that loads the data on a given page number. This function must return either an array of
     * T representing the new data, or null to signify there is no further data.
     * @param page The page number
     * @return An array of T or null
     */
    loadPage: (page: number) => Promise<{ data: T[]; hasPrev: boolean; hasNext: boolean }>;

    component: React.ComponentType<GridViewItemProps<T>>;
}

export default function GridView<T>(props: GridViewProps<T>) {
    const [data, setData] = React.useState<T[]>([]);
    const [nextPage, setNextPage] = React.useState<number | null>(null);
    const [prevPage, setPrevPage] = React.useState<number | null>(null);

    // Load our initial data
    React.useEffect(() => {
        props.loadPage(props.initialPage).then((response) => {
            setData(response.data);
            setNextPage(response.hasNext ? props.initialPage + 1 : null);
            setPrevPage(response.hasPrev ? props.initialPage - 1 : null);
        })
    }, [props.initialPage]);

    // We reached the bottom of the page, so down we go.
    React.useEffect(() => {
        window.onscroll = debounce(async () => {
            console.log("innerHeight + scrollTop:", window.innerHeight + window.scrollY);
            console.log("offsetHeight:", document.body.scrollHeight - 100);

            if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 100) {
                console.log("Past threshold!");
                if (nextPage) {
                    const page = await props.loadPage(nextPage);
                    setData([...data, ...page.data]);
                    setNextPage(page.hasNext ? nextPage + 1 : null)
                }
            }
        }, 100);
    }, []);

    return (
        <div className="grid-view">
            {data.map((data, index) =>
                <props.component key={index} {...{data: data}} />
            )}
        </div>
    );
}
