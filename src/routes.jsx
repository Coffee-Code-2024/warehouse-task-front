import App from './App';
import { Login } from './components/Login.jsx';

export const routes = [
    {
        path: '/',
        element: <App />
    },
    {
        path: '/tasks/*',
        element: <Login/>
    },
    {
        path: '*',
        element: <Login />
    }
]