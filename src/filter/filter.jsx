import React, {useState} from "react";
import styles from "./filter.module.css"

const filter = (allValues, handleChanges) => {
    const createButton = (label) => {
        return <div key={label} className={styles[`filter${label}Container`]}>
            <input type={"checkbox"} onChange={() => handleChanges(label)}
                   checked={allValues[label]}
                   className={styles[`filter${label}`]}/>
            {/*<p className={`filter-buttons ${allValues[element] ? "checked" : ""}`}>{element}</p>*/}
            <p className={styles[`${allValues[label] ? "checked" : ""}`]}>{label}</p>
        </div>

    }
    return <div className={styles.filter}>
        {createButton(`All`)}
        {createButton(`Active`)}
        {createButton(`Completed`)}
    </div>
}

export default filter