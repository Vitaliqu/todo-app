import React, {useEffect, useState} from 'react';
import './App.css';
import Task from "./task/task.jsx";
import filter from "./filter/filter.jsx";
import taskContainer from "./taskContainer/taskContainer.jsx";
import textInputContainer from "./textInputContainer/textInputContainer.jsx";
import topPanel from "./topPanel/topPanel.jsx";

const App = () => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");

    const [size, setSize] = useState(false)
    const [createButton, setCreateButton] = useState(false)
    const [input, setInput] = useState('');

    const storedTheme = localStorage.getItem("darkTheme");
    const [themeSwitch, setThemeSwitch] = useState(storedTheme ? JSON.parse(storedTheme) : darkThemeMq.matches);

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
        localStorage.setItem("darkTheme", themeSwitch);
        document.body.classList.toggle("dark-theme");
        setThemeSwitch(!themeSwitch)
    }
    const createTask = (text) => {
        if (!taskList.map(element => element.text).includes(text) && text) {
            setCreateButton(true)
            setInput(``)
            setTaskList([new Task(text, false, false), ...taskList]);
        }
    }
    useEffect(() => {
        document.body.classList.toggle('dark-theme', themeSwitch);
        setSize(mediaQuery.matches);
        mediaQuery.addEventListener("change", () => setSize(mediaQuery.matches));
        localStorage.setItem("darkTheme", JSON.stringify(themeSwitch))
        localStorage.setItem("taskList", JSON.stringify(taskList))
    },[taskList,themeSwitch]);

    return <>
        <div className={"background-image"}></div>
        <div className={"application"}>
            {topPanel(changeTheme, themeSwitch)}
            {textInputContainer(themeSwitch, setCreateButton, createButton, createTask, setInput, input)}
            {taskContainer(allValues, taskList, setTaskList, handleChanges, size, themeSwitch)}
            {size && filter(allValues, handleChanges, themeSwitch)}
        </div>
    </>
}

export default App;
