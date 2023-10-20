import './App.css'

function App() {
    let array = []
    for (let i = 0; i < 50; i++) array.push(i)
    return (
        <>
            <div className={"background-image"}></div>
            <div className={"application"}>
                <div className={"top-panel"}>
                    <div className={"todo-label"}>TODO</div>
                    <div className={"theme-switch"}><img src="./public/images/icon-moon.svg" alt=""/></div>
                </div>
                <div className={"text-input-container"}>
                    <div className={"checkMark-container"}>
                        <input className={"check-mark"} type="checkbox"/>
                    </div>
                    <input className={"text-input"} type="text"/>
                </div>
                <div className={"task-container"}>
                    <ul className={"task-list"}>
                        {array.map(element=><li key={element}>{element}</li>)}
                    </ul>
                    <div className={"navigation-panel"}>
                        <div className={"items-left"}>0 items left</div>
                        <div className={"filter"}>
                            <div className={"filter-all"}>All</div>
                            <div className={"filter-active"}>Active</div>
                            <div className={"filter-completed"}>Completed</div>
                        </div>
                        <div className={"clear-button"}>Clear completed</div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;