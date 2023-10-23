import React, {useEffect, useState} from 'react';
import './App.css';
import moonIcon from '../public/images/icon-moon.svg';


function App() {
    let [size, setSize] = useState(0)
    const [isAllChecked, setAllChecked] = useState(true);
    const [isActiveChecked, setActiveChecked] = useState(false);
    const [isCompletedChecked, setCompletedChecked] = useState(false);
    const [themeSwitch, setThemeSwitch] = useState(window.matchMedia("(prefers-color-scheme: dark)").matches);

    const changeTheme = () => {
        localStorage.setItem("theme", themeSwitch ? "dark" : "light");
        document.body.classList.toggle("dark-theme");
        setThemeSwitch(!themeSwitch)
    }


    const handleAllChange = () => {
        setAllChecked(true);
        setActiveChecked(false)
        setCompletedChecked(false)
    };

    const handleActiveChange = () => {
        setActiveChecked(true);
        setAllChecked(false);
        setCompletedChecked(false)
    };

    const handleCompletedChange = () => {
        setCompletedChecked(true);
        setAllChecked(false);
        setActiveChecked(false)
    };

    let mediaQuery = window.matchMedia("(max-width: 768px)");
    const filter =
        <div className={"filter"}>
            <div className={`filter-all-container`}>
                <input type={"checkbox"} onChange={handleAllChange} checked={isAllChecked} className={"filter-all"}/>
                <p className={` ${isAllChecked ? 'checked' : ''}`}>All</p>
            </div>
            <div className={`filter-active-container `}>
                <input type={"checkbox"} onChange={handleActiveChange} checked={isActiveChecked}
                       className={"filter-active"}/>
                <p className={`${isActiveChecked ? 'checked' : ''}`}>Active</p>
            </div>
            <div className={`filter-completed-container`}>
                <input type={"checkbox"} onChange={handleCompletedChange} checked={isCompletedChecked}
                       className={"filter-completed"}/>
                <p className={` ${isCompletedChecked ? 'checked' : ''}`}>Completed</p>
            </div>
        </div>

    useEffect(() => {
        if (themeSwitch) document.body.classList.add("dark-theme");
        else document.body.classList.remove("dark-theme");
        setSize(mediaQuery.matches ? 1 : 0);
        mediaQuery.addEventListener("change", () => setSize(mediaQuery.matches ? 1 : 0));
    }, [size]);

    let array = [];
    for (let i = 0; i < 12; i++) array.push(i);
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
                        <img src={moonIcon} alt=""/>
                    </div>
                </div>
                <div className={"text-input-container"}>
                    <div className={"checkMark-container"}>
                        <input
                            className={"check-mark"}

                            type="checkbox"
                        />
                    </div>
                    <input className={"text-input"} type="text"/>
                </div>
                <div className={"task-container"}>
                    <ul className={"task-list"}>
                        {array.map((element) => (
                            <li key={element}>{element}</li>
                        ))}
                    </ul>
                    <div className={"navigation-panel"}>
                        <div className={"items-left"}>{array.length} items left</div>
                        {size === 0 && filter}
                        <div className={"clear-button"}>Clear completed</div>
                    </div>
                </div>
                {size === 1 && filter}
            </div>
        </>
    );
}

export default App;
