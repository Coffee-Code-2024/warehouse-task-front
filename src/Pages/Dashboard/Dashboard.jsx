import { TaskContent } from "./../../components/Task/TaskContent.jsx"
import { useEffect } from "react"
import { FormTask } from './../../components/Task/FormTask.jsx';
import { useGetTasks } from "../../shared/hooks/useGetTasks.jsx"
import { PacmanLoader } from 'react-spinners'
import { Header } from './../../components/Header/Header.jsx'

import './dashboard.css'

export const Dashboard = ({token}) => {

  const { tasks, getTasks, isFetching } = useGetTasks();

  useEffect(() => {//metodo que se ejecuta al principio del componente
    getTasks();
  }, []);

  if (isFetching) {
    return (
      <div className='container d-flex align-items-center justify-content-center vw-100'>
        <PacmanLoader color='#FFeb37' />
      </div>
    )
  }

  return (

    <div className="dashboard-container">
      <Header token={token}/>
      <FormTask tareas={tasks}/>
    </div>
  )
}
