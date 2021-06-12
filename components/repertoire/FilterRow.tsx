import React, { useState } from "react"
import FilterButton from "./FilterButton";

export default function FilterRow({ setFilter } : any) {


    const filterOptions = ["title", "initialism", "artist"]
    const initialFilter = "title"

    const [isFilterOnArray, setIsFilterOnArray] = useState(filterOptions.map((filter) => filter === initialFilter))

    return (
        <div className="d-flex">
            Filter:
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