import { FormTask } from './FormTask.jsx';
import { UseGetTasks } from './../../shared/hooks/useGetTasks.jsx';
import { useEffect } from 'react';
import { Header } from './../../components/Header/Header.jsx'
import { PacmanLoader } from 'react-spinners'

export const TaskContent = () => {

  const { tasks, isFetching, getTasks } = UseGetTasks();

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

  console.log(tasks);


  //rutas hijas
  return (
    <>

      <div>
        <div>
          <Header />
        </div>
        <FormTask tareas={tasks} />
      </div>
    </>

  )
}
