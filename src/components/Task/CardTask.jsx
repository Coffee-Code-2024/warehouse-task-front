import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUpdateTask } from './../../shared/hooks/useUpdateTask'
import { useDeleteTask } from '../../shared/hooks/useDeleteTask'

import { Card, CardHeader, CardBody, CardFooter, Divider } from "@nextui-org/react";
import TaskList from './TaskList';

export const CardTask = ({ tareas }) => {
    const { updatedTask, isFetching, updateTask } = useUpdateTask()
    const { deleteTask } = useDeleteTask();

    const [taskToUpdate, setTaskToUpdate] = useState({
        _id: '',
        title: '',
        description: '',
        startDate: null,
        endDate: null,
        status: null,
        user: null
    });

    const getUpdate = (task) => {
        setTask(task);
    }

    const handleChange = (e) => {
        setTask((prevData) => (
            {
                ...prevData,
                [e.target.name]: e.target.value
            }
        ))
    }


    const handleSubmit = () => {
        updateTask(
            task._id,
            task
        )
    }

    const delTask = (id) => {
        deleteTask(id);
    }

    return (
        <>
            {tareas.map((task) => (
                <div key={task._id}>
                    <Card className="max-w-[400px]" style={{ backgroundColor: '#11111150', padding: '10px', border: '2px solid black', borderRadius: '5px' }}>
                        <CardHeader className="flex gap-3">
                            <div className="flex flex-col">
                                <p className="text-md">{task.title}</p>
                                <p className="text-small text-default-500 text-black">{task.status}</p>
                            </div>
                        </CardHeader>
                        <Divider />
                        <CardBody>
                            <p>{task.description}</p>
                            <p>Inicio: {task.startDate} | Fin: {task.endDate}</p>
                            <p>{task.user}</p>
                        </CardBody>
                        <Divider />
                        <CardFooter>
                            <Button color="warning" onClick={() => handleUpdate(task)}>
                                Actualizar
                            </Button>
                            {/* Suponiendo que tienes una función para eliminar una tarea */}
                            <Button color="danger" onClick={() => delTask(task._id)}>
                                Eliminar
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            ))}
        </>

    )
}