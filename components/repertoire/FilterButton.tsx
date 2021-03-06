import React, {useState} from "react";
import Song from "../../lib/types/song";

export default function FilterButton({ setFilter, filter, index, isFilterOnArray, setIsFilterOnArray } : any) {


    function handleSetFilter(filter : string) {
        setFilter(filter)
        console.log(filter)
        setIsFilterOnArray((prevState : boolean[]) => {
            let resultArray = prevState.map(() => false)
            resultArray[index] = true

            return resultArray
        })

    }

    return (
        <button
            className={`btn ${isFilterOnArray[index] ? "btn-danger" : "btn-link"}`}
            onClick={() => handleSetFilter(filter)}
        >
            {filter}
        </button>
    )
}