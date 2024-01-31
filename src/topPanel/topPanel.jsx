import moonIcon from "../../public/images/icon-moon.svg";
import sunIcon from "../../public/images/icon-sun.svg";
import React from "react";
import styles from "./topPanel.module.css"

const topPanel = (changeTheme, themeSwitch) => {
    return (
        <div className={styles.topPanel}>
            <div className={styles.todoLabel}>TODO</div>
            <div className={styles.themeSwitchContainer} style={themeSwitch ? {
                transform: "rotate(90deg)"
            } : {}}>
                <input className={styles.themeSwitch}
                       type="checkbox"
                       onChange={changeTheme}
                       checked={themeSwitch}/>
                <img className={styles.moonIcon} style={themeSwitch ? {opacity: 0} : {}} src={moonIcon} alt=""/>
                <img className={styles.sunIcon} style={themeSwitch ? {opacity: 1} : {}} src={sunIcon} alt=""/>
            </div>
        </div>)
}
export default topPanel