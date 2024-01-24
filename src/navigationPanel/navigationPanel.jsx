import filter from "../filter/filter.jsx";
import React from "react";
import styles from "./navigationPanel.module.css"

const deleteCompleted = (setTaskList) => {
    setTaskList(taskList => taskList.map(element => {
        element.checked ? element.deleted = true : false;
        return element
    }))
}
const navigationPanel = (taskList, size, allValues, handleChanges, setTaskList, theme) => {
    return <div className={styles.navigationPanel}>
        <div style={theme ? {color: "white"} : null}
             className={styles.itemsLeft}>{taskList.filter(element => !element.checked).length} items left
        </div>
        {!size && filter(allValues, handleChanges, theme)}
        <div onClick={() => {deleteCompleted(setTaskList)}}
             className={styles.clearButton}
             data-theme={theme}>Clear completed
        </div>
    </div>
}
export default navigationPanel