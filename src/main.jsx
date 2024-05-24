import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Header } from './components/Header/Header'
import { BrowserRouter } from 'react-router-dom'
import { routes } from './routes';
import { useRoutes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'

export const MainRoutes = () => {
  const elementRoutes = useRoutes(routes)
  return (
    <>
      {elementRoutes}
      <Toaster position="bottom-right" reverseOrder={true} />

    </>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <BrowserRouter>
        <MainRoutes></MainRoutes>
      </BrowserRouter>
  </React.StrictMode>,
)