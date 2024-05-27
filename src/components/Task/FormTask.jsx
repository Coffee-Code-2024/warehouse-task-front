import { useState, useEffect } from 'react';
import { useUpdateTask } from '../../shared/hooks/useUpdateTask.jsx';
import { useDeleteTask } from '../../shared/hooks/useDeleteTask.jsx';
import { format, isValid } from 'date-fns';
import { Input } from '../Input.jsx';
import { ComboBox } from '../ComboBox.jsx';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSaveTask } from '../../shared/hooks/useSaveTask.jsx';
import './../../Pages/Dashboard/dashboard.css';

export const FormTask = ({ tareas }) => {
    const [state, setState] = useState(true);
    const { updatedTask, isFetching, updateTask } = useUpdateTask();
    const { deleteTask } = useDeleteTask();
    const [allTasks, setAllTasks] = useState([]);
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [task, setTask] = useState({
        _id: '',
        title: '',
        description: '',
        startDate: null,
        endDate: null,
        status: 'DOING',
        user: ''
    });
    const { saveTask, isLoading } = useSaveTask();

    const getUpdate = (tarea) => {
        if (!tarea.endDate) {
            tarea.endDate = null;
        }
        setTask(tarea);
        setState(false);
    };

    const resetTask = () => {
        setTask({
            _id: '',
            title: '',
            description: '',
            startDate: null,
            endDate: null,
            status: 'DOING',
            user: ''
        });
    };

    const validateForm = () => {
        const { title, description, startDate, endDate, status } = task;
        return title && description && startDate && endDate && status;
    };

    const handleAddTask = async () => {
        if (!validateForm()) return;

        const savedTask = await saveTask(
            task.title, task.description, task.startDate, task.endDate, task.status
        );

        if (savedTask) {
            setAllTasks(prevTasks => (
                [...prevTasks, savedTask]
            ));
            setFilteredTasks(prevTasks => (
                [...prevTasks, savedTask]
            ));

            resetTask();
        }
    };

    const handleStartDateChange = (date) => {
        setTask({ ...task, startDate: date });
    };

    const handleEndDateChange = (date) => {
        setTask({ ...task, endDate: date });
    };

    const handleSubmit = () => {
        if (!validateForm()) return;

        updateTask(task._id, task)
            .then(() => {
                setAllTasks(prevTasks =>
                    prevTasks.map(t => t._id === task._id ? task : t)
                );
                setFilteredTasks(prevTasks =>
                    prevTasks.map(t => t._id === task._id ? task : t)
                );
                setState(true);
                resetTask();
            });
    };

    const delTask = (id) => {
        deleteTask(id)
            .then(() => {
                setAllTasks(prevTasks => prevTasks.filter(t => t._id !== id));
                setFilteredTasks(prevTasks => prevTasks.filter(t => t._id !== id));
            });
    };

    const handleInputChange = (value, field) => {
        if (field === 'startDate' || field === 'endDate') {
            setTask({ ...task, [field]: new Date(value) });
        } else {
            setTask({ ...task, [field]: value });
        }
    };

    const statusOptions = [
        { value: 'DOING', label: 'DOING' },
        { value: 'DONE', label: 'DONE' },
        { value: 'TO-DO', label: 'TO-DO' },
    ];

    const handleStatusFilter = (status) => {
        if (status === 'all') {
            setFilteredTasks([...allTasks].sort((a, b) => {
                const statusOrder = ['DOING', 'DONE', 'TO-DO'];
                const aIndex = statusOrder.indexOf(a.status);
                const bIndex = statusOrder.indexOf(b.status);
                return aIndex - bIndex;
            }));
        } else {
            setFilteredTasks(allTasks.filter((task) => task.status === status).sort((a, b) => {
                const statusOrder = ['DOING', 'DONE', 'TO-DO'];
                const aIndex = statusOrder.indexOf(a.status);
                const bIndex = statusOrder.indexOf(b.status);
                return aIndex - bIndex;
            }));
        }
    };

    useEffect(() => {
        if (tareas) {
            const sortedTasks = [...tareas].sort((a, b) => {
                const statusOrder = ['DOING', 'DONE', 'TO-DO'];
                const aIndex = statusOrder.indexOf(a.status);
                const bIndex = statusOrder.indexOf(b.status);
                return aIndex - bIndex;
            });
            setAllTasks(sortedTasks);
            setFilteredTasks(sortedTasks);
        }
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
                                    <label htmlFor="startTask">Start Task</label>
                                    <DatePicker
                                        id='startTask'
                                        selected={task.startDate} // Pasar la fecha seleccionada
                                        onChange={handleStartDateChange} // Manejar el cambio de fecha
                                        dateFormat="yyyy-MM-dd" // Formato de fecha deseado
                                    />
                                    <label htmlFor="endTask">End Task</label>
                                    <DatePicker
                                        id='endDask'
                                        selected={task.endDate} // Pasar la fecha seleccionada
                                        onChange={handleEndDateChange} // Manejar el cambio de fecha
                                        dateFormat="yyyy-MM-dd" // Formato de fecha deseado
                                    />
                                </div>
                            </div>
                            {
                                state ? (
                                    <button
                                        className='btn btn-primary m-2 w-100'
                                        onClick={handleAddTask}
                                        disabled={!validateForm()}
                                    >
                                        Add Task
                                    </button>
                                ) : (
                                    <button
                                        className='btn btn-primary m-2 w-100'
                                        onClick={handleSubmit}
                                        disabled={!validateForm()}
                                    >
                                        Update Task
                                    </button>
                                )
                            }
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
                            <div key={i} className="card border-info mt-3"
                                style={{ maxWidth: "20rem", background: tarea.status == 'DOING' ? '#F4DB88' : tarea.status == 'DONE' ? '#DAF7A6' : '#FFF' }}
                            >
                                <div className="card-header">{tarea.user ? `${tarea.user.name} ${tarea.user.surname}` : 'Sin asignar'}</div>
                                <div className="card-body">
                                    <div className='d-flex align-items-center'>
                                        <h5 className="card-title">{tarea.title} </h5> &nbsp; | &nbsp; {tarea.status}
                                    </div>
                                    <p className="card-text">{tarea.description}</p>
                                    <div>
                                        <p>Inicio: {format(new Date(tarea.startDate), "dd/MM/yyyy")}</p>
                                        <p>Fin: {tarea.endDate && isValid(new Date(tarea.endDate)) ? format(new Date(tarea.endDate), "dd/MM/yyyy") : 'No especificado'}</p>
                                    </div>
                                </div>
                                <div className='card-footer'>
                                    <button type="button" className="btn btn-warning m-1" onClick={() => getUpdate(tarea)}>Editar</button>
                                    <button type="button" className="btn btn-danger m-1" onClick={() => delTask(tarea._id)}>Eliminar</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
