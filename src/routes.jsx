import App from './App';
import { PageNotFound } from './Pages/PageNotFound/PageNotFound.jsx';
import { Login } from './components/Login.jsx';
import { TaskContent } from './components/Task/TaskContent.jsx';
import { CardTask } from './components/Task/CardTask.jsx'

export const routes = [
    {
        path: '/',
        element: <App />
    },{
        path: '/card',
        element: <CardTask />
    },
    {
        path: '/dashboard/*',
        element: <TaskContent />
    },
    {
        path: '*',
        elent: <PageNotFound />
    }
]