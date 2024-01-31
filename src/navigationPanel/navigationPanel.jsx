import filter from "../filter/filter.jsx";
import React from "react";
import styles from "./navigationPanel.module.css"

const deleteCompleted = (setTaskList) => {
    setTaskList(taskList => taskList.map(element => {
        element.checked && (element.deleted = true)
        return element
    }))
}
const navigationPanel = (taskList, size, allValues, handleChanges, setTaskList, theme) => {
    return (
        <div className={styles.navigationPanel} data-theme={theme}>
            <div className={styles.itemsLeft}
                 style={theme ? {color: 'white'} : {}}>
                {taskList.filter(element => !element.checked).length} items left
            </div>
            {!size && filter(allValues, handleChanges, theme)}
            <div className={styles.clearButton}
                 data-theme={theme}
                 onClick={() => {
                     deleteCompleted(setTaskList)
                 }}>
                Clear completed
            </div>
        </div>)
}
export default navigationPanel