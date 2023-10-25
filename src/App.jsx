import React, {useEffect, useState} from 'react';
import './App.css';
import moonIcon from '../public/images/icon-moon.svg';
import sunIcon from '../public/images/icon-sun.svg';


function App() {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const [size, setSize] = useState(0)
    const [createButton, setCreateButton] = useState(false)
    const createTask = () => {
        setCreateButton(true)
        setTimeout(() => setCreateButton(false), 200)
    }
    const [themeSwitch, setThemeSwitch] = useState(window.matchMedia("(prefers-color-scheme: dark)").matches);
    const [allValues, setAllValues] = useState({
        All: true,
        Active: false,
        Completed: false
    });
    const changeTheme = () => {
        localStorage.setItem("theme", themeSwitch ? "dark" : "light");
        document.body.classList.toggle("dark-theme");
        setThemeSwitch(!themeSwitch)
    }

    const filter = () => {
        const handleChanges = (button) => {
            setAllValues({
                All: button === "All",
                Active: button === "Active",
                Completed: button === "Completed"
            });
        }
        return (
            <div className={"filter"}>
                {Object.keys(allValues).map(element => {
                    return (
                        <div key={element} className={`filter-${element}-container`}>
                            <input type={"checkbox"} onChange={() => handleChanges(element)}
                                   checked={allValues[element]}
                                   className={`filter-${element}`}/>
                            <p className={allValues[element] ? "checked" : ""}>{element}</p>
                        </div>)
                })}
            </div>
        )
    }
    useEffect(() => {
        if (themeSwitch) document.body.classList.add("dark-theme");
        else document.body.classList.remove("dark-theme");
        setSize(mediaQuery.matches ? 1 : 0);
        mediaQuery.addEventListener("change", () => setSize(mediaQuery.matches ? 1 : 0));
    }, [size]);

    let array = [];
    for (let i = 0; i < 7; i++) array.push(i);
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
                            onChange={createTask}
                        />
                    </div>
                    <input className={"text-input"} placeholder={`Create a new todo...`} type="text"/>
                </div>
                <div className={"task-container"}>
                    <ul className={"task-list"}>
                        {array.map((element) => (
                            <li className={"task"} key={element}>
                                <div className={"task-checkbox-container"}>
                                    <input className={"task-checkbox"} type="checkbox"/>
                                </div>
                                Jog around the park 3x
                            </li>
                        ))}
                    </ul>
                    <div className={"navigation-panel"}>
                        <div className={"items-left"}>{array.length} items left</div>
                        {size === 0 && filter()}
                        <div className={"clear-button"}>Clear completed</div>
                    </div>
                </div>
                {size === 1 && filter()}
            </div>
        </>
    );
}

export default App;
