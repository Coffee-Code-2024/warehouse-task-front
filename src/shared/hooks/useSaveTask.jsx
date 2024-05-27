import { useState } from 'react';
import toast from 'react-hot-toast'
import { createTaskRequest } from '../../services/api';

export const useSaveTask = () => {
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
                response?.err?.data?.message ||
                response?.err?.response?.data?.message ||
                response?.err?.message ||
                'Error al crear tarea. Intenta de nuevo.'
            )
        }

        toast.success(response.data.message)
        return response.data.task;
    }
    return {
        saveTask,
        isLoading
    }

}
