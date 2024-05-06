import App from './App';
import { PageNotFound } from './Pages/PageNotFound/PageNotFound.jsx';
import { Login } from './components/Login.jsx';
import { Dashboard } from "./Pages/Dashboard/Dashboard.jsx";

export const routes = [
    {
        path: '/',
        element: <App />
    },
    {
        path: '/tasks/*',
        element: <Dashboard />
    },
    {
        path: '*',
        elent: <PageNotFound />
    }
]