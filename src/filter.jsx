import React, {useState} from "react";

const filter = (allValues, handleChanges) => {

    return (
        <div className={"filter"}>
            {Object.keys(allValues).map((element, index) => {
                return (
                    <div key={index} className={`filter-${element}-container`}>
                        <input type={"checkbox"} onChange={() => handleChanges(element)}
                               checked={allValues[element]}
                               className={`filter-${element}`}/>
                        <p className={`filter-buttons ${allValues[element] ? "checked" : ""}`}>{element}</p>
                    </div>)
            })}
        </div>
    )
}

export default filter