import React from "react";
import styles from "./task.module.css"

class Task {
    constructor(text, checked) {
        this.text = text;
        this.checked = checked;
        this.deleted = false;
    }

    construction = (taskList, setTaskList, theme) => {
        console.log(theme)
        return <li key={this.text}
                   onTransitionEnd={this.deleted ? () => this.deleteTask(setTaskList) : null}
                   style={this.deleted ? {
                       height: 0,
                       opacity: 0,
                       borderColor: "transparent",
                       overflow: "hidden",
                       transition: "height 0.7s ease-in-out,opacity 2s ease-in-out,border-color 2s"
                   } : {opacity: 1}}
                   className={styles.task}
                   data-theme={theme}>
            <div
                className={`task-checkbox-container ${this.checked ? "created-task" : null}`}>
                <input onChange={() => {
                    const updatedTaskList = [...taskList];
                    this.checked = !updatedTaskList.find(element => element === this).checked;
                    setTaskList(updatedTaskList)
                }}
                       checked={this.checked}
                       className={"task-checkbox"} type="checkbox"/>
            </div>
            <div contentEditable={true}
                 className={`task-text ${this.checked ? "checked-task-text" : null}`}>{this.text}
            </div>
            <div id={this.text} onClick={() => {
                this.deleted = true;
                setTaskList((TaskList) => [...TaskList])
            }}
                 className={styles.deleteButton}>&#10005;</div>
        </li>
    }
    deleteTask = (setTaskList) => {
        setTaskList((taskList) => taskList.filter((element) => element !== this));
    }
}

export default Task