import { useState } from "react"
import { getTasksRequest } from "../../services/api"
import toast from 'react-hot-toast'

export const useGetTasks = () => {

    const [tasks, setTasks] = useState(null);//guardar los datos que me devuelve el back

    const getTasks = async () => {
        const response = await getTasksRequest()//respuesta del back api.js
        if (response.error) {
            return toast.error(
                response?.err?.data?.message ||
                'Error al obtener las tareas'
            )
        }

        setTasks(response.data);
    }

    return {
        tasks,
        isFetching: !tasks,
        getTasks
    }
}
