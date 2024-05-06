import { TaskList } from "../../components/Task/TaskList.jsx"
import { useEffect } from "react"
import { useGetTasks } from "../../shared/hooks/useGetTasks.jsx"
import { PacmanLoader } from 'react-spinners'
import './dashboard.css'

export const Dashboard = () => {

  const { tasks, getTasks, isFetching } = useGetTasks();

  useEffect(() => {//metodo que se ejecuta al principio del componente
    getTasks();
  }, []);

  console.log(tasks)

  if (isFetching) {
    return (
      <div className='container d-flex align-items-center justify-content-center vw-100'>
        <PacmanLoader color='#FFeb37' />
      </div>
    )
  }

  return (
    <div className="dashboard-container">
      <TaskList />
    </div>
  )
}
