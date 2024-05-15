import { RouterProvider } from 'react-router-dom'
import { useAppSelector } from './hooks'
import Router from './pages/router'
import './App.css'
import { PopupError } from './components/popup/popup_errors'

function App() {
  const notifyStates = useAppSelector((state) => state.notify)

  return (
    <>
      <div className="fixed top-0 right-0 mt-20 mr-4">
        <PopupError notify={notifyStates} />
      </div>
      <RouterProvider
        router={Router}
        fallbackElement={<p>Initial Load...</p>}
      />
    </>
  )
}

export default App
