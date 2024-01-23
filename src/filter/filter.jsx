import styles from "./filter.module.css"

const filter = (allValues, handleChanges, theme) => {
    const createButton = (label) => {
        return <div onClick={() => handleChanges(label)} key={label} className={styles[`filter${label}Container`]}>
            <input type={"checkbox"}
                   className={styles[`filter${label}`]}/>
            <p className={styles.filterLabel} style={allValues[label] ? {
                opacity: '1',
                color: "hsl(220, 98%, 61%)"
            } : null} data-theme={theme}>{label}</p>
        </div>

    }
    return <div className={styles.filter} style={theme ? {backgroundColor: "hsl(235, 24%, 19%)"} : null}>
        {createButton(`All`)}
        {createButton(`Active`)}
        {createButton(`Completed`)}
    </div>
}

export default filter