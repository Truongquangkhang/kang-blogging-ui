import { createBrowserRouter } from 'react-router-dom'
import Login from './login/index.tsx'
import NotFound from './errors/forbidden/index.tsx'
import Home from './home/index.tsx'
import LogOut from './logout/index.tsx'
import Register from './register/index.tsx'
import LayOut from './layout/layout.tsx'
const Router = createBrowserRouter([
  {
    path: '/',
    element: <LayOut />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/logout',
        element: <LogOut />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
])

export default Router
