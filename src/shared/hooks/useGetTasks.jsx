import { useEffect, useState } from "react"
import { getTasksRequest } from "../../services/api"
import toast from 'react-hot-toast'

export const useGetTasks = () => {
    const [tasks, setTasks] = useState([]);//guardar los datos que me devuelve el back
    const [isFetching, setIsFetching] = useState(false);

    const getTasks = async () => {
        const response = await getTasksRequest()//respuesta del back api.js
        if (response.error) {
            //response.err.data depende de como venga en el back
            return toast.error(
                response?.err?.data?.message ||
                response?.err?.response?.data?.message ||
                response?.err?.message ||
                'Error al obtener las tareas'
            )
        }
        
        //console.log(response);
        //setTasks(prevTask => [...prevTask, response]);
        setTasks(response.data.tasks)
        //console.log(tasks)
    }

    return {
        tasks,
        isFetching: !tasks,
        getTasks
    }
}
