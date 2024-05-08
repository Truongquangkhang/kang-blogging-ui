import { createBrowserRouter } from 'react-router-dom'
import Login from './login/index.tsx';
import NotFound from './errors/forbidden/index.tsx';
import Home from './home/index.tsx';


const Router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "*",
        element: <NotFound />
    }
])

export default Router