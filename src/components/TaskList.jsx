import React, { useState, useEffect } from 'react';
import { Input } from './Input.jsx';
import { ComboBox } from './ComboBox.jsx';
import coffeandcode from '../img/coffeandcode.png'
import { useSaveTask } from '../shared/hooks/useSaveTask.jsx';

export const TaskList = () => {
  // Declarar el estado de `tasks` y `setTasks`
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);

  // Pasar `tasks` y `setTasks` al hook `useSaveTask`
  const { saveTask, isLoading } = useSaveTask({ tasks, setTasks });

  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    status: '',
    startDate: new Date(),
    endDate: new Date(),
    name: '',
  });



  const handleInputChange = (value, field) => {
    if (field === 'startDate' || field === 'endDate') {
      setNewTask({ ...newTask, [field]: new Date(value) });
    } else {
      setNewTask({ ...newTask, [field]: value });
    }
  };

  const handleAddTask = () => {
    // Llama a la función saveTask de useAddTask
    saveTask(newTask.title, newTask.description, newTask.startDate, newTask.endDate, newTask.status, newTask.name);
    //const newTasks = [...tasks, newTask];
    //setTasks(newTasks);
    //setFilteredTasks(newTasks);

    setNewTask({
      title: '',
      description: '',
      status: 'DOING',
      startDate: new Date(),
      endDate: new Date(),
      name: '',
    });
  };

  const statusOptions = [
    { value: 'DOING', label: 'DOING' },
    { value: 'DONE', label: 'DONE' },
    { value: 'TO-DO', label: 'TO-DO' },
  ];

  const handleStatusFilter = (status) => {
    if (status === 'all') {
      setFilteredTasks([...tasks].sort((a, b) => {
        const statusOrder = ['DOING', 'DONE', 'TO-DO'];
        const aIndex = statusOrder.indexOf(a.status);
        const bIndex = statusOrder.indexOf(b.status);
        return aIndex - bIndex;
      }));
    } else {
      setFilteredTasks(tasks.filter((task) => task.status === status).sort((a, b) => {
        const statusOrder = ['DOING', 'DONE', 'TO-DO'];
        const aIndex = statusOrder.indexOf(a.status);
        const bIndex = statusOrder.indexOf(b.status);
        return aIndex - bIndex;
      }));
    }
  };

  useEffect(() => {
    const sortedTasks = [...tasks].sort((a, b) => {
      const statusOrder = ['DOING', 'DONE', 'TO-DO'];
      const aIndex = statusOrder.indexOf(a.status);
      const bIndex = statusOrder.indexOf(b.status);
      return aIndex - bIndex;
    });
    setFilteredTasks(sortedTasks);
  }, [tasks]);

  return (
    <div className="task-list">
      <div className="task-container">
        <img src={coffeandcode} className="logo" />
        <div className='task-container-list'>
          <h1>Task List</h1>
          <div className="task-list-form">
            <Input
              field="title"
              label="Title:"
              value={newTask.title}
              onChangeHandler={handleInputChange}
              type="text"
              showErrorMessage={true}
              onBlurHandler={() => { /* handle blur event */ }}
            />
            <Input
              field="description"
              label="Description:"
              value={newTask.description}
              onChangeHandler={handleInputChange}
              type="textarea"
              textarea={true}
              showErrorMessage={true}
              onBlurHandler={() => { /* handle blur event */ }}
            />
            <ComboBox
              field="status"
              label="Status:"
              value={newTask.status}
              onChangeHandler={handleInputChange}
              options={statusOptions}
            />
            <Input
              field="startDate"
              label="Start Date:"
              value={newTask.startDate.toLocaleDateString('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit' })}
              onChangeHandler={handleInputChange}
              type="date"
              showErrorMessage={true}
              onBlurHandler={() => { /* handle blur event */ }}
            />
            <Input
              field="endDate"
              label="EndDate:"
              value={newTask.endDate.toLocaleDateString('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit' })}
              onChangeHandler={handleInputChange}
              type="date"
              showErrorMessage={true}
              onBlurHandler={() => { /* handle blur event */ }}
            />
            <Input
              field="name"
              label="Name:"
              value={newTask.name}
              onChangeHandler={handleInputChange}
              type="text"
              showErrorMessage={true}
              onBlurHandler={() => { /* handle blur event */ }}
            />
            <button onClick={handleAddTask}>Add Task</button>
          </div>
          <div className="task-list-controls">
            <button onClick={() => handleStatusFilter('DOING')}>Doing</button>
            <button onClick={() => handleStatusFilter('DONE')}>Done</button>
            <button onClick={() => handleStatusFilter('TO-DO')}>To-Do</button>
            <button onClick={() => handleStatusFilter('all')}>All</button>
          </div>
        </div>
        <div className="task-list-tasks-container">
          <div className="task-list-tasks">
            {filteredTasks.map((task, index) => (
              <div key={index} className={`task-list-task task-list-task--${task.status}`}>
                <h3>{task.title}</h3>
                <p>{task.description}</p>
                <p>Status: {task.status}</p>
                <p>
                  Start Date: {task.startDate ? task.startDate.toLocaleDateString() : ''}, End Date: {task.endDate ? task.endDate.toLocaleDateString() : ''}
                </p>
                <p>Name: {task.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TaskList;
