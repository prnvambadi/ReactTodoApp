import React,{useState} from 'react'


const TaskForm = ({onAdd}) => {
    const [taskName, setTaskName] = useState('');
    function handleSubmit(e) {
        e.preventDefault();
        onAdd(taskName);
        setTaskName('');



    }
  return (
   <form onSubmit={handleSubmit}>
    <button>+</button>
    <input type="text" 
    placeholder='your next task'
    value={taskName}
    onChange={e => setTaskName(e.target.value)}
    />
   </form>
  )
}

export default TaskForm