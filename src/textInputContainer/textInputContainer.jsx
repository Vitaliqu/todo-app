import React from 'react';
import styles from './textInputContainer.module.css';
import checkmark from '../../public/images/checkmark.svg';

const TextInputContainer = (themeSwitch, setCreateButton, createButton, createTask, setInput, input) => {
    return (
        <div className={styles.textInputContainer} data-theme={themeSwitch}>
            <div className={styles.inputCheckMarkContainer}>
                <div className={styles.gradient}
                     onTransitionEnd={(() => setCreateButton(false))} style={createButton ? {opacity: 1} : {}}>
                    <img className={styles.createdTask} src={checkmark} style={createButton ? {opacity: 1} : {}}
                         alt={null}/>
                </div>
                <input className={styles.inputCheckMark}
                       type="checkbox"
                       checked={createButton}
                       onChange={() => createTask(input)}
                       data-theme={themeSwitch}/>
            </div>
            <input className={styles.textInput}
                   type="text"
                   value={input}
                   onInput={event => setInput(event.target.value)}
                   onKeyDown={event => event.key === 'Enter' ? createTask(input) : null}
                   placeholder={`Create a new todo...`}/>
        </div>
    );
};

export default TextInputContainer;
