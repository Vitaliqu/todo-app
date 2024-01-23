import navigationPanel from "../navigationPanel/navigationPanel.jsx";
import React from "react";
import styles from "./taskContainer.module.css"

const taskContainer = (allValues, taskList, setTaskList, handleChanges, size, theme) => {
    return <>
        <div className={styles.taskContainer}
             style={theme ? {
                 color: "hsl(234, 39%, 85%)",
                 backgroundColor: "hsl(235, 24%, 19%)"
             } : null}>
            <ul className={"task-list"}>
                {(allValues.All ? taskList : allValues.Active ? taskList.filter(element => !element.checked) : taskList.filter(element => element.checked)).map((element) => {
                    return element.construction(taskList, setTaskList, theme)
                })}
            </ul>
            {
                navigationPanel(taskList, size, allValues, handleChanges, setTaskList, theme)
            }
        </div>
    </>
}
export default taskContainer