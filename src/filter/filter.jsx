import styles from "./filter.module.css"

const selectedStyle = {
    opacity: '1',
    color: "hsl(220, 98%, 61%)"
}
const filter = (allValues, handleChanges, theme) => {
    const createButton = (label) => {
        return (
            <div className={styles.filterContainer} key={label} onClick={() => handleChanges(label)}>
                <input className={styles.filterCheckbox} type={"checkbox"}/>
                <p className={styles.filterLabel} style={allValues[label] ? selectedStyle : {}}
                   data-theme={theme}>{label}</p>
            </div>)
    }
    return (
        <div className={styles.filter} data-theme={theme}>
            {createButton(`All`)}
            {createButton(`Active`)}
            {createButton(`Completed`)}
        </div>)
}

export default filter