import { Route, Routes } from 'react-router-dom';
import { CardTask } from './CardTask.jsx';
import { UseGetTasks } from './../../shared/hooks/useGetTasks.jsx';
import { useEffect } from 'react';
import { PacmanLoader } from 'react-spinners'
import { TaskList } from './../Task/TaskList.jsx'; //Task lists //formulario

export const TaskContent = () => {

  const { tasks, getTasks, isFetching } = UseGetTasks();

  useEffect(() => {
    getTasks();
  }, [])

  if (isFetching) {
    return (
      <div className="container d-flex align-items-center justify-content-center vh-100">
        <PacmanLoader color="#ffe733" />
      </div>
    )
  }

  //rutas hijas
  return (
    <div>
      <Routes>
        <Route path='tasks' element={<CardTask tareas={tasks} />} />
      </Routes>
    </div>
  )
}
