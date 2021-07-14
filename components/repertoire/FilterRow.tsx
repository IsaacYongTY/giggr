import React, { useState } from "react"
import FilterButton from "./FilterButton";
import styles from "../../assets/scss/components/repertoire/_filter-row.module.scss";

export default function FilterRow({ setFilter } : any) {


    const filterOptions = ["title", "initialism", "artist"]
    const initialFilter = "title"

    const [isFilterOnArray, setIsFilterOnArray] = useState(filterOptions.map((filter) => filter === initialFilter))

    return (
        <div className={styles.container}>
            <div>Filter:</div>
            {
                filterOptions.map( (filter, index) => (
                    <FilterButton
                        filter={filter}
                        setFilter={setFilter}
                        index={index}
                        setIsFilterOnArray={setIsFilterOnArray}
                        isFilterOnArray={isFilterOnArray}
                        key={index}
                    />
                ))
            }
        </div>

    )
}