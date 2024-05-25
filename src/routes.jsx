import App from './App';
import { PageNotFound } from './Pages/PageNotFound/PageNotFound.jsx';
import { Login } from './components/Login.jsx';
import { Dashboard } from './Pages/Dashboard/Dashboard.jsx';
import { jwtDecode } from 'jwt-decode';

export const routes = [
    {
        path: '/',
        element: <App />
    },
    {
        path: '/dashboard',
        element: <Dashboard token={localStorage.getItem('token') ? jwtDecode(localStorage.getItem('token')) : ''}/>
    },
    {
        path: '*',
        element: <PageNotFound/>
    }
]