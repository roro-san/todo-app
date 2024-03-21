import { Task } from '../Task';
import styles from './tasks.module.css';

export function Tasks({ tasks, onComplete, onDelete, onEdit, onDeleteAll, onCompleteAll, onMarkAllUndone }) {
    const tasksQuantity = tasks.length;
    const completedTasks = tasks.filter(task => task.isCompleted).length;

    return (
        <section className={styles.tasks}>
            <header className={styles.header}>
                <div>
                    <p>All Tasks</p>
                    <span>{tasksQuantity}</span>
                </div>

                <div>
                    <p className={styles.textPurple}>Completed Tasks</p>
                    <span>{completedTasks} of {tasksQuantity}</span>
                </div>
            </header>

            <div className={styles.list}>
                {tasks.map(task => (
                    <Task 
                        key={task.id} 
                        task={task} 
                        onComplete={onComplete} 
                        onDelete={onDelete} 
                        onEdit={onEdit} 
                    />
                ))}
            </div>

            <div className={styles.buttons}>
                <button className={styles.deleteAllButton} onClick={onDeleteAll}>Delete all tasks</button>
                <button className={styles.completeAllButton} onClick={onCompleteAll}>Complete all tasks</button>
                <button className={styles.markAllUndoneButton} onClick={onMarkAllUndone}>Mark all undone</button>
            </div>
        </section>
    )
}
