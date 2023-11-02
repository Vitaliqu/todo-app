import React, {useEffect, useState} from 'react';
import './App.css';
import moonIcon from '../public/images/icon-moon.svg';
import sunIcon from '../public/images/icon-sun.svg';
import filter from "./filter.jsx";

function App() {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const [size, setSize] = useState(0)
    const [createButton, setCreateButton] = useState(false)
    const [input, setInput] = useState('');
    const [themeSwitch, setThemeSwitch] = useState(localStorage.getItem("whiteTheme") ? JSON.parse(localStorage.getItem("whiteTheme")) : window.matchMedia("(prefers-color-scheme: dark)").matches);
    const [taskList, setTaskList] = useState(localStorage.getItem("taskList") ? JSON.parse(localStorage.getItem("taskList")) : []);
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
            taskList.unshift({text: text, checked: false, deleted: false})
            setTimeout(() => setCreateButton(false), 200)
        }
    }
    useEffect(() => {
        document.body.classList.toggle('dark-theme', themeSwitch);
        setSize(mediaQuery.matches ? 1 : 0);
        mediaQuery.addEventListener("change", () => setSize(mediaQuery.matches ? 1 : 0));
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
                <div className={"text-input-container"}>
                    <div className={`input-checkMark-container ${createButton && "created-task"}`}>
                        <input
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
                <div className={"task-container"}>
                    <ul className={"task-list"}>
                        {(allValues.All ? taskList : allValues.Active ? taskList.filter(element => !element.checked) : taskList.filter(element => element.checked)).map((element, index) => {
                            requestAnimationFrame(() => element.deleted = false)
                            return (
                                <li draggable={true} key={index}
                                    style={element.deleted ? {
                                        height: 0,
                                        borderWidth: 0,
                                        overflow: "hidden",
                                        transition: "height 0.3s, border-width 0.2s"
                                    } : {opacity: 1}}
                                    className={`task`}>
                                    <div
                                        style={element.deleted ? {
                                            opacity:"none",
                                        transition: "opacity 0.3s"
                                    } : {opacity: 1}}
                                        className={`task-checkbox-container ${element.checked ? "created-task" : null}`}>
                                        <input onChange={() => {
                                            const updatedTaskList = [...taskList];
                                            updatedTaskList[index].checked = !updatedTaskList[index].checked;
                                            setTaskList(updatedTaskList)
                                        }}
                                               checked={taskList[index].checked}
                                               className={"task-checkbox"} type="checkbox"/>
                                    </div>
                                    <div
                                        className={`task-text ${element.checked ? "checked-task-text" : null}`}>{element.text}
                                    </div>
                                    <div onClick={async () => {
                                        const updatedTaskList = [...taskList];
                                        updatedTaskList[index].deleted = true;
                                        setTaskList(updatedTaskList)
                                        setTimeout(() => setTaskList(taskList.filter((element, id) => id !== index)), 300)
                                    }} className={"delete-button"}>&#10005;</div>
                                </li>
                            )
                        })}
                    </ul>
                    <div className={"navigation-panel"}>
                        <div className={"items-left"}>{taskList.filter(element => !element.checked).length} items left
                        </div>
                        {size === 0 && filter(allValues, handleChanges)}
                        <div onClick={() => {
                            setTaskList([...taskList].map(element => {
                                element.checked ? element.deleted = true: null;
                                return element
                            }))
                            setTimeout(()=>setTaskList([...taskList].filter(element => !element.checked)),200)
                        }} className={"clear-button"}>Clear completed
                        </div>
                    </div>
                </div>
                {size === 1 && filter(allValues, handleChanges)}
            </div>
        </>
    );
}

export default App;
