import React from "react";
import styles from "./task.module.css"
import checkmark from "../../public/images/checkmark.svg"

const deleteStyle = {
    height: 0,
    opacity: 0,
    borderColor: "transparent",
    overflow: "hidden",
    transition: "height 0.7s ease-in-out,opacity 2s ease-in-out,border-color 2s"
}

class Task {
    constructor(text, checked, deleted) {
        this.text = text;
        this.checked = checked;
        this.deleted = deleted;
    }

    construction = (taskList, setTaskList, theme) => {
        return <li key={this.text}
                   onTransitionEnd={this.deleted ? (transition) => transition.propertyName === "height" ? this.deleteTask(setTaskList) : null : null}
                   style={this.deleted ? deleteStyle : {opacity: 1}}
                   className={styles.task}
                   data-theme={theme}>
            <div className={styles.taskCheckboxContainer} style={this.checked ? {
                background: "linear-gradient(hsl(192, 100%, 67%), hsl(280, 87%, 65%))", border: "none"
            } : null}>
                <img src={checkmark}
                     className={styles.createdTask} style={this.checked ? {opacity: 1} : null} alt={null}/>
                <input checked={this.checked}
                       className={styles.taskCheckbox}
                       type="checkbox"
                       onChange={() => {
                           const updatedTaskList = [...taskList];
                           this.checked = !updatedTaskList.find(element => element === this).checked;
                           setTaskList(updatedTaskList)
                       }}/>
            </div>
            <div className={styles.taskText}
                 style={this.checked ? {textDecoration: "line-through", opacity: 0.5} : null}>{this.text}
            </div>
            <div id={this.text} onClick={() => {
                this.deleted = true;
                setTaskList((TaskList) => [...TaskList])
            }} className={styles.deleteButton}>&#10005;</div>
        </li>
    }
    deleteTask = (setTaskList) => {
        setTaskList((taskList) => taskList.filter((element) => element !== this));
    }
}

export default Task