import { useState } from "react";
import styles from './task.module.css';
import { CiEdit } from 'react-icons/ci'; 
import { BsTrash, BsCheckCircleFill} from 'react-icons/bs'; 

export function Task({ task, onComplete, onDelete, onEdit }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(task.title);
    const [originalTitle, setOriginalTitle] = useState(task.title);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        onEdit(task.id, editedTitle);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditedTitle(originalTitle);
        setIsEditing(false);
    };

    const handleTitleChange = (e) => {
        setEditedTitle(e.target.value);
    };

    return (
        <div className={styles.task}>
            <button className={styles.checkContainer} onClick={() => onComplete(task.id)}>
                {task.isCompleted ? <BsCheckCircleFill /> : <div />}
            </button>
    
            {isEditing ? (
                <div className={styles.editContainer}>
                    <input
                        type="text"
                        className={styles.editInput}
                        value={editedTitle}
                        onChange={handleTitleChange}
                        autoFocus
                    />
                    <button className={styles.saveButton} onClick={handleSave}>Save</button>
                    <button className={styles.cancelButton} onClick={handleCancel}>Cancel</button>
                </div>
            ) : (
                <>
                    <p className={task.isCompleted ? styles.textCompleted : ""}>{task.title}</p>
                    <p className={styles.lastModified}>
                        {task.lastModified === task.createdAt ? 'Added on: ' : 'Modified on: '}
                        {task.lastModified}
                    </p>
                </>
            )}
    
            {!isEditing && (
                <button className={styles.editButton} onClick={handleEdit}>
                    <CiEdit size={25} /> {}
                </button>
            )}
    
            <button className={styles.deleteButton} onClick={() => onDelete(task.id)}>
                <BsTrash size={20} /> {}
            </button>
        </div>
    );
}