import { useState } from 'react';
import toast from 'react-hot-toast'
import { createTaskRequest } from '../../services/api';

export const useSaveTask = ({ tasks, setTasks }) => {
    const [isLoading, setIsLoading] = useState(false);

    const saveTask = async (title, description, startDate, endDate, status) => {
        setIsLoading(true)
        let data = {
            title,
            description,
            startDate,
            endDate,
            status
        }
        const response = await createTaskRequest(data);
        setIsLoading(false);

        if (response.error) {
            return toast.error(
                response?.e?.response?.data ||
                'Error al crear tarea. Intenta de nuevo.'
            )
        }
        // Actualizar la lista de tareas con la nueva tarea creada
        setTasks([...tasks, response.data]); // Suponiendo que `response.data` contiene la nueva tarea creada
    }
    return {
        saveTask,
        isLoading
    }

}
