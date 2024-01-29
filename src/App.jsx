import React, {useEffect, useState} from 'react';
import './App.css';
import moonIcon from '../public/images/icon-moon.svg';
import sunIcon from '../public/images/icon-sun.svg';
import filter from "./filter/filter.jsx";
import taskContainer from "./taskContainer/taskContainer.jsx";
import Task from "./task/task.jsx";

function App() {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const [size, setSize] = useState(false)
    const [createButton, setCreateButton] = useState(false)
    const [input, setInput] = useState('');
    const [themeSwitch, setThemeSwitch] = useState(localStorage.getItem("whiteTheme") ? JSON.parse(localStorage.getItem("whiteTheme")) : window.matchMedia("(prefers-color-scheme: dark)").matches);
    const [taskList, setTaskList] = useState(localStorage.getItem("taskList") ? JSON.parse(localStorage.getItem("taskList")).map(element => new Task(element.text, element.checked, element.deleted)) : []);
    const [allValues, setAllValues] = useState({
        All: true,
        Active: false,
        Completed: false
    });
    const handleChanges = (button) => {
        setAllValues({
            All: button === "All",
            Active: button === "Active",
            Completed: button === "Completed"
        });
    }
    const changeTheme = () => {
        localStorage.setItem("theme", themeSwitch ? "dark" : "light");
        document.body.classList.toggle("dark-theme");
        setThemeSwitch(!themeSwitch)
    }
    const createTask = (text) => {
        if (!taskList.map(element => element.text).includes(text) && text) {
            setCreateButton(true)
            setInput(``)
            taskList.unshift(new Task(text, false, false))
            setTimeout(() => setCreateButton(false), 200)
        }
    }
    useEffect(() => {
        document.body.classList.toggle('dark-theme', themeSwitch);
        setSize(mediaQuery.matches);
        mediaQuery.addEventListener("change", () => setSize(mediaQuery.matches));
        localStorage.setItem("whiteTheme", JSON.stringify(themeSwitch))
        localStorage.setItem("taskList", JSON.stringify(taskList))
    });
    return (
        <>
            <div className={"background-image"}></div>
            <div className={"application"}>
                <div className={"top-panel"}>
                    <div className={"todo-label"}>TODO</div>
                    <div className={"theme-switch-container"}>
                        <input type="checkbox" className={`theme-switch`}
                               onChange={changeTheme}
                               checked={themeSwitch}/>
                        <img className={"moon-icon"} src={moonIcon} alt=""/>
                        <img className={"sun-icon"} src={sunIcon} alt=""/>
                    </div>
                </div>
                <div data-theme={themeSwitch} className={"text-input-container"}>
                    <div data-theme={themeSwitch} className={`input-checkMark-container ${createButton && "created-task"}`}>
                        <input
                            data-theme={themeSwitch}
                            className={`input-check-mark`}
                            type="checkbox"
                            checked={createButton}
                            onChange={() => createTask(input)}
                        />
                    </div>
                    <input className={"text-input"} value={input} onInput={event => {
                        setInput(event.target.value)
                    }}
                           onKeyDown={(button) => button.key === "Enter" ? createTask(input) : null}
                           placeholder={`Create a new todo...`}
                           type="text"/>
                </div>
                <taskContainer allValues={allValues} taskList={taskList} setTaskList/>
                {taskContainer(allValues, taskList, setTaskList, handleChanges, size, themeSwitch)}
                {size && filter(allValues, handleChanges, themeSwitch)}
            </div>
        </>
    );
}

export default App;
