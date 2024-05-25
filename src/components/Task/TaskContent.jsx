import { FormTask } from './FormTask.jsx';
import { useGetTasks } from './../../shared/hooks/useGetTasks.jsx';
import { useEffect } from 'react';
import { PacmanLoader } from 'react-spinners'

export const TaskContent = () => {

  const { tasks, isFetching, getTasks } = useGetTasks();

  useEffect(() => {
    getTasks();
  }, [])

  if (isFetching) {
    return (
      <div>
        <PacmanLoader color="#ffe733" />
      </div>
    )
  }


  //rutas hijas
  return (
    <>

      <div>
        <FormTask tareas={tasks} />
      </div>
    </>

  )
}
