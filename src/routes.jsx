import App from './App';
import { PageNotFound } from './Pages/PageNotFound/PageNotFound.jsx';
import { Login } from './components/Login.jsx';
import { TaskContent } from './components/Task/TaskContent.jsx';
import { FormTask } from './components/Task/FormTask.jsx'

export const routes = [
    {
        path: '/',
        element: <App />
    },
    {
        path: '/dashboard',
        element: <TaskContent />
    },
    {
        path: '*',
        element: <PageNotFound/>
    }
]