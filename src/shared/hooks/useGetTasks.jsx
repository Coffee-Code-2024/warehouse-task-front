import { useState } from "react"
import { getTasksRequest } from "../../services/api"
import toast from 'react-hot-toast'

export const UseGetTasks = () => {
    const [tasks, setTasks] = useState([]);//guardar los datos que me devuelve el back
    const [isFetching, setIsFetching] = useState(false);

    const getTasks = async () => {
        setIsFetching(true);
        const response = await getTasksRequest()//respuesta del back api.js
        setIsFetching(false);
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
        isFetching,
        getTasks
    }
}
