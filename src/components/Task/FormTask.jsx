import { useState } from 'react';
import { useUpdateTask } from '../../shared/hooks/useUpdateTask.jsx'
import { useDeleteTask } from '../../shared/hooks/useDeleteTask.jsx';
import { format } from 'date-fns';
import { Input } from '../Input.jsx';
import { ComboBox } from '../ComboBox.jsx';
import { useSaveTask } from '../../shared/hooks/useSaveTask.jsx';
import { useEffect } from 'react';
import './../../Pages/Dashboard/dashboard.css'

export const FormTask = ({ tareas }) => {
    const { updatedTask, isFetching, updateTask } = useUpdateTask()
    const { deleteTask } = useDeleteTask();
    const [filteredTasks, setFilteredTasks] = useState([]);
    //crear nueva tarea
    const [task, setTask] = useState({
        _id: '',
        title: '',
        description: '',
        startDate: '',
        endDate: '',
        status: '',
        user: ''
    });
    const { saveTask, isLoading } = useSaveTask();


    const getUpdate = (tarea) => {
        setTask(tarea);
    }

    const handleChange = (e) => {
        setTask((prevData) => (
            {
                ...prevData,
                [e.target.name]: e.target.value
            }
        ))
    }

    const handleSubmit = (id, task) => {
        updateTask(
            id,
            task
        )
    }

    const delTask = (id) => {
        deleteTask(id);
    }

    //doren
    const handleInputChange = (value, field) => {
        if (field === 'startDate' || field === 'endDate') {
            setTask({ ...task, [field]: new Date(value) });
        } else {
            setTask({ ...task, [field]: value });
        }

        if(field == 'status'){
            console.log(task.status);
        }

        
    };

    const handleAddTask = () => {
        // Llama a la función saveTask de useAddTask
        saveTask(task.title, task.description, task.startDate, task.endDate, task.status, task.name);
        //const newTasks = [...tasks, newTask];
        //setTasks(newTasks);
        //setFilteredTasks(newTasks);

        /*setTask({
            title: '',
            description: '',
            status: 'DOING',
            startDate: new Date(),
            endDate: new Date(),
            name: '',
        });*/
    };

    const statusOptions = [
        { value: 'DOING', label: 'DOING' },
        { value: 'DONE', label: 'DONE' },
        { value: 'TO-DO', label: 'TO-DO' },
    ];

    const handleStatusFilter = (status) => {
        if (status === 'all') {
            setFilteredTasks([...tareas].sort((a, b) => {
                const statusOrder = ['DOING', 'DONE', 'TO-DO'];
                const aIndex = statusOrder.indexOf(a.status);
                const bIndex = statusOrder.indexOf(b.status);
                return aIndex - bIndex;
            }));
        } else {
            setFilteredTasks(tareas.filter((task) => task.status === status).sort((a, b) => {
                const statusOrder = ['DOING', 'DONE', 'TO-DO'];
                const aIndex = statusOrder.indexOf(a.status);
                const bIndex = statusOrder.indexOf(b.status);
                return aIndex - bIndex;
            }));
        }
    };

    useEffect(() => {
        const sortedTasks = [...tareas].sort((a, b) => {
            const statusOrder = ['DOING', 'DONE', 'TO-DO'];
            const aIndex = statusOrder.indexOf(a.status);
            const bIndex = statusOrder.indexOf(b.status);
            return aIndex - bIndex;
        });
        setFilteredTasks(sortedTasks);

    }, [tareas]);


    return (
        <>
            <div className="task-list">
                <div className="task-container">
                    <div className='task-form-list'>
                        <div className="task-list-form">
                            <h1>Task List</h1>
                            <Input
                                field="title"
                                label="Title"
                                value={task.title}
                                onChangeHandler={handleInputChange}
                                type="text"
                                showErrorMessage={true}
                                onBlurHandler={() => { /* handle blur event */ }}
                            />
                            <Input
                                field="description"
                                label="Description"
                                value={task.description}
                                onChangeHandler={handleInputChange}
                                type="textarea"
                                textarea={true}
                                showErrorMessage={true}
                                onBlurHandler={() => { /* handle blur event */ }}
                            />
                            <div className="d-flex" style={{ maxWidth: '100%' }}>
                                <div className="flex-grow-1 p-2" style={{ maxWidth: '33%', minWidth: 0 }}>
                                    <ComboBox
                                        field="status"
                                        label="Status"
                                        value={task.status}
                                        onChangeHandler={handleInputChange}
                                        options={statusOptions}
                                    />
                                </div>
                                <div className="flex-grow-1 p-2" style={{ maxWidth: '33%', minWidth: 0 }}>
                                    <Input
                                        field="startDate"
                                        label="Start Date:"
                                        value={task.startDate ? new Date(task.startDate).toLocaleDateString('en-CA') : ""}
                                        onChangeHandler={handleInputChange}
                                        type="date"
                                        showErrorMessage={true}
                                        onBlurHandler={() => { /* handle blur event */ }}
                                    />
                                    <Input
                                        field="endDate"
                                        label="EndDate:"
                                        value={task.endDate ? new Date(task.endDate).toLocaleDateString('en-CA') : ""}
                                        onChangeHandler={handleInputChange}
                                        type="date"
                                        showErrorMessage={true}
                                        onBlurHandler={() => { /* handle blur event */ }}
                                    />
                                </div>

                            </div>

                            <button className='btn btn-primary m-2 w-100' onClick={handleAddTask}>Add Task</button>
                        </div>
                        <div className="task-list-controls">
                            <button onClick={() => handleStatusFilter('DOING')}>DOING</button>
                            <button onClick={() => handleStatusFilter('DONE')}>DONE</button>
                            <button onClick={() => handleStatusFilter('TO-DO')}>TO-DO</button>
                            <button onClick={() => handleStatusFilter('all')}>ALL</button>
                        </div>


                    </div>


                    <div className="task-list-tasks-container d-flex flex-column" style={{ minHeight: "100%", overflowY: "auto" }}>
                        {filteredTasks.map((tarea, i) => (
                            <div key={i} className="card border-info mt-3" style={{ maxWidth: "20rem" }}>
                                <div className="card-header">{tarea.user.name + ' ' + tarea.user.surname}</div>
                                <div className="card-body">
                                    <h5 className="card-title">{tarea.title}</h5>
                                    <p className="card-text">{tarea.description}</p>
                                    <div>
                                        <p>Inicio: {format(new Date(tarea.startDate), "dd/MM/yyyy")}</p>
                                        <p>Fin: {format(new Date(tarea.startDate), "dd/MM/yyyy")}</p>
                                    </div>
                                </div>
                                <div className='card-footer'>
                                    <button type="button" className="btn btn-warning m-1">Editar</button>
                                    <button type="button" className="btn btn-danger m-1">Eliminar</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>


        </>

    )
}