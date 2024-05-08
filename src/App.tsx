import { RouterProvider } from 'react-router-dom'
import Router from './pages/router'
import './App.css'
import Header from './components/header'

function App() {
  return (
    <>
      <div className="fixed w-full top-0 left-0">
        <Header />
      </div>

      <RouterProvider
        router={Router}
        fallbackElement={<p>Initial Load...</p>}
      />
    </>
  )
}

export default App
