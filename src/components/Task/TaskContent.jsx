import { Route, Routes } from 'react-router-dom';
import { CardTask } from './CardTask.jsx';
import { UseGetTasks } from './../../shared/hooks/useGetTasks.jsx';
import { useEffect } from 'react';
import { PacmanLoader } from 'react-spinners'
import { TaskList } from './../Task/TaskList.jsx'; //Task lists //formulario

export const TaskContent = () => {

  const { tasks, isFetching, getTasks } = UseGetTasks();

  useEffect(() => {
    getTasks();
  }, [])

  if (isFetching) {
    return (
      <div>
        {isFetching ? (
          <PacmanLoader color="#ffe733" />
        ) : (
          <CardTask tareas={tasks} />
        )}
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
