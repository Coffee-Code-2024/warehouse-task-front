import toast from 'react-hot-toast'
import { deleteTaskRequest } from '../../services/api'

export const useDeleteTask = () => {
    const deleteTask = async(id)=>{
        const response = await deleteTaskRequest(id)
        if(response.error){
            return toast.error( 'Error al eliminar la tarea')
        }
        return toast.success('Tarea eliminada')
    }
  return {
    deleteTask
  }
}
