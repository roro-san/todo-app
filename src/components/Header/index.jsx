import logo from '../../assets/logo.svg';
import { CiCirclePlus } from 'react-icons/ci';
import styles from './header.module.css';
import { useState } from 'react';

export function Header({ onAddTask}) {
    const [title, setTitle] = useState('');

    function handleSubmit(event) {
        event.preventDefault();

        onAddTask(title);
        setTitle('');
    }

    function onChangeTitle(event) {
        setTitle(event.target.value);
    }

    return (
        <header className={styles.header}>
            <img src={logo} />

            <form onSubmit={handleSubmit} className={styles.newTaskForm}>
                <input placeholder="Add new task..." type="text" value={title} onChange={onChangeTitle} />
                <button>
                    Add
                    <CiCirclePlus size={20}/>
                </button>
            </form>
        </header>
    )
}