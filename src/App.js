import { useEffect, useState } from 'react';
import './App.css';
import Task from './components/Task';
import TaskForm from './components/TaskForm';

function App() {
  const [tasks,setTasks]= useState([]);

  useEffect(()=>{
    if(tasks.length === 0) return;
    localStorage.setItem('tasks', JSON.stringify(tasks));
  },[tasks]);

  useEffect(() => {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    setTasks(tasks || []);
  },[])

  function addTask(name){
    setTasks(prev => {
      return [...prev , {name:name,done:false}];
    });
  }

  function updateTaskDone(taskIndex,newDone){
    setTasks(prev => {
      const newTasks = [...prev];
      newTasks[taskIndex].done = newDone;
      return newTasks;
      
    })
    
    
  }
  const numberComplete = tasks.filter(t => t.done ).length;
  const numberTotal = tasks.length;

  function getMessage() {
    const percentage = numberComplete/numberTotal * 100;
    if (percentage === 0) {
      return 'Try to do at least one! 🙏';
    }
    if (percentage === 100) {
      return 'Nice job for today! 🏝';
    }
    return 'Keep it going 💪🏻';
  }

  function removeTask(indexToRemove) {
    setTasks(prev => {
      return prev.filter((taskObject,index) => index !== indexToRemove);
    })

  }
  function onRenameTask(renameIndex,Rename){
    setTasks(prev => {
      const newTasks = [...prev];
      newTasks[renameIndex].name = Rename;
      return newTasks;
    })
  }

  
  return (
    <main className="main">
      <h1>{numberComplete}/{numberTotal} Complete</h1>
      <h2>{getMessage()}</h2>
      <TaskForm onAdd={addTask}/>
      {tasks.map((task,index) => (
      <Task {...task} 
      onRename={newName => onRenameTask(index,newName)}
      onToggle={done =>updateTaskDone(index,done)}
      onTrash={() => removeTask(index)}/>
      ))}
    </main>
  );
  
}

export default App;
