import { useEffect, useState } from "react"
import { Header } from "./components/Header"
import { Tasks } from "./components/Tasks"

const LS_KEY = "todo:savedtasks";

function App() {
    const [tasks, setTasks] = useState([]);

    function loadSavedTasks() {
        const saved = localStorage.getItem(LS_KEY);
        if (saved) {
            setTasks(JSON.parse(saved));
        }
    }

    useEffect(() => {
        loadSavedTasks();
    }, [])

    function saveTasks(newTasks) {
        setTasks(newTasks);
        localStorage.setItem(LS_KEY, JSON.stringify(newTasks));
    }

    function addTask(taskTitle) {
        if (taskTitle.trim() !== '') { 
            const createdAt = new Date().toLocaleString();
            saveTasks([
                ...tasks,
                {
                    id: crypto.randomUUID(),
                    title: taskTitle,
                    isCompleted: false,
                    createdAt,
                    lastModified: createdAt 
                }
            ]);
        } else {
            alert('Task cannot be empty. Please input task first.');
        }
    }
  
    function deleteTaskById(taskId) {
        const confirmDelete = window.confirm('Are you sure you want to delete this task?');
        if (confirmDelete) {
            const newTasks = tasks.filter(task => task.id !== taskId);
            saveTasks(newTasks);
        }
    }

    function deleteAllTasks() {
        const confirmDeleteAll = window.confirm('Are you sure you want to delete all tasks?');
        if (confirmDeleteAll) {
            saveTasks([]);
        }
    }

    function completeAllTasks() {
        const updatedTasks = tasks.map(task => ({
            ...task,
            isCompleted: true
        }));
        saveTasks(updatedTasks);
    }

    function taskCompleted(taskId) {
        const newTasks = tasks.map(task => {
            if (task.id === taskId) {
                return {
                    ...task,
                    isCompleted: !task.isCompleted
                }
            }
            return task;
        });
        saveTasks(newTasks);
    }

    function handleTaskEdit(taskId, editedTitle) {
        const updatedTasks = tasks.map(task => {
            if (task.id === taskId) {
                return {
                    ...task,
                    title: editedTitle,
                    lastModified: new Date().toLocaleString() 
                };
            }
            return task;
        });
        saveTasks(updatedTasks);
    }

    function markAllUndone() {
        const newTasks = tasks.map(task => ({
            ...task,
            isCompleted: false
        }));
        saveTasks(newTasks);
    }

    return (
        <div>
            <Header onAddTask={addTask} />
            <Tasks
                tasks={tasks}
                onDelete={deleteTaskById}
                onDeleteAll={deleteAllTasks}
                onComplete={taskCompleted}
                onCompleteAll={completeAllTasks}
                onEdit={handleTaskEdit}
                onMarkAllUndone={markAllUndone} 
            />
        </div>
    )
}

export default App
