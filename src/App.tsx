import './App.css'
import { RouterProvider } from 'react-router-dom'
import Router from './pages/router'

function App() {
  return (
    <RouterProvider router={Router} fallbackElement={<p>Initial Load...</p>} />
  )
}

export default App
