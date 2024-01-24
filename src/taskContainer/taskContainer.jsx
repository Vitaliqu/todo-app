import navigationPanel from "../navigationPanel/navigationPanel.jsx";
import React from "react";
import styles from "./taskContainer.module.css"

const taskContainer = (allValues, taskList, setTaskList, handleChanges, size, theme) => {
    const filterValue = taskList.filter((element) =>
        (allValues.All && true) ||
        (allValues.Active && !element.checked)
        || (allValues.Completed && element.checked));

    return <div className={styles.taskContainer} data-theme={theme}>
        <ul className={styles.taskList}>{filterValue.map(element => element.construction(taskList, setTaskList, theme))}</ul>
        {navigationPanel(taskList, size, allValues, handleChanges, setTaskList, theme)}
    </div>
}
export default taskContainer