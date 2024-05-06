import App from './App';
import { PageNotFound } from './Pages/PageNotFound/PageNotFound.jsx';
import { Login } from './components/Login.jsx';

export const routes = [
    {
        path: '/',
        element: <App />
    },
    {
        path: '/tasks/*',
        element: <Login />
    },
    {
        path: '*',
        elent: <PageNotFound />
    }
]