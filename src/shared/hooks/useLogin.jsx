import { useState } from 'react';
import toast from 'react-hot-toast'
import { loginRequest } from '../../services/api';
import { useNavigate } from 'react-router-dom';

export const useLogin = () => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const login = async(username, password)=>{
        setIsLoading(true);
        const user = {
            username,
            password
        }
        const response = await loginRequest(user);
        setIsLoading(false);

        if(response.error){
            return toast.error(
                response?.e?.response?.data ||
                'Error al logeatse. Intenta de nuevo.'
            )
        }

        //userDetails?
        const { token } = response.data
        localStorage.setItem('user', token)
        navigate('/tasks')//redireccionamiento de pagina
    }

  return (
    login,
    isLoading
  )
}


