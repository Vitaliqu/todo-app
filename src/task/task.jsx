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

    deleteTask = (setTaskList) => {
        setTaskList((taskList) => taskList.filter((element) => element !== this));
    }
    construction = (taskList, setTaskList, theme) => {
        return (
            <li className={styles.task}
                style={this.deleted ? deleteStyle : {opacity: 1}}
                key={this.text}
                onTransitionEnd={this.deleted ? (transition) => transition.propertyName === "height" && this.deleteTask(setTaskList) : null}
                data-theme={theme}>
                <div className={styles.taskCheckboxContainer} style={this.checked ? {
                    border: "none"
                } : {}}>
                    <div className={styles.checkedTask} style={this.checked ? {opacity: 1} : {}}>
                        <img className={styles.createdTask}
                             src={checkmark}
                             style={this.checked ? {opacity: 1} : {}} alt={null}/></div>
                    <input className={styles.taskCheckbox}
                           checked={this.checked}
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
                <div className={styles.deleteButton}
                     id={this.text} onClick={() => {
                    this.deleted = true;
                    setTaskList((TaskList) => [...TaskList])
                }}>&#10005;</div>
            </li>)
    }

}

export default Task