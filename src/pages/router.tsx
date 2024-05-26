import { createBrowserRouter } from 'react-router-dom'
import Login from './login/index.tsx'
import NotFound from './errors/forbidden/index.tsx'
import Home from './home/index.tsx'
import LogOut from './logout/index.tsx'
import Register from './register/index.tsx'
import LayOut from './layout/layout.tsx'
import Blog from './blog/index.tsx'
import CreateBlog from './create-blog/index.tsx'
import FilterBlogs from './filter-blog/index.tsx'
import Category from './category/index.tsx'

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
        path: '/blog',
        element: <FilterBlogs />,
      },
      {
        path: '/blog/:id',
        element: <Blog />,
      },
      {
        path: '/blog/create',
        element: <CreateBlog />,
      },
      {
        path: '/category/:id',
        element: <Category />,
      },
    ],
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
  {
    path: '*',
    element: <NotFound />,
  },
])

export default Router
