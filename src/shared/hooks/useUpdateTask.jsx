import { useState } from "react"
import { modifyTaskRequest } from '../../services/api'
import toast from 'react-hot-toast'

export const useUpdateTask = () => {

    const [updatedTask, setUpdateTask] = useState(null);

    const updateTask = async (id, task) => {
        const response = await modifyTaskRequest(id, task)
        if (response.error) {
            toast.error(
                response?.err?.response?.data?.message ||
                'Error al actualizar el post'
            )
        }
        setUpdateTask(response.data)
        toast.success('Actualizado correctamente');
    }

    return {
        updatedTask,
        isFetching: !updatedTask,
        updateTask
    }

}
