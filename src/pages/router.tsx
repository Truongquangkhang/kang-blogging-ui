import { Navigate, createBrowserRouter } from 'react-router-dom'
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
import Search from './search/index.tsx'
import UserProfile from './user_profile/index.tsx'
import EditUser from './edit_profile/index.tsx'
import EditBlog from './edit_blog/index.tsx'
import Discussion from './discussion/index.tsx'
import CommentDetail from './comment_detail/index.tsx'
import Report from './report/index.tsx'

interface ProtectedRouteProps {
  element: React.ComponentType<any>
  isAuthenticated: boolean
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  element: Component,
  isAuthenticated,
  ...rest
}) => {
  return isAuthenticated ? <Component {...rest} /> : <Navigate to="/login" />
}

const isAuthenticated = (): boolean => {
  return !!localStorage.getItem('auth')
}

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
        path: '/blog/:id/edit',
        element: (
          <ProtectedRoute
            element={EditBlog}
            isAuthenticated={isAuthenticated()}
          />
        ),
      },
      {
        path: '/blog/create',
        element: (
          <ProtectedRoute
            element={CreateBlog}
            isAuthenticated={isAuthenticated()}
          />
        ),
      },
      {
        path: '/user/:id',
        element: <UserProfile />,
      },
      {
        path: '/user/:id/edit',
        element: (
          <ProtectedRoute
            element={EditUser}
            isAuthenticated={isAuthenticated()}
          />
        ),
      },
      {
        path: '/category/:id',
        element: <Category />,
      },
      {
        path: '/discussion',
        element: <Discussion />,
      },
      {
        path: '/comment/:id',
        element: <CommentDetail />,
      },
      {
        path: '/search',
        element: <Search />,
      },
      {
        path: '/report',
        element: <Report />,
      },
      {
        path: '/edit-profile',
        element: (
          <ProtectedRoute
            element={EditUser}
            isAuthenticated={isAuthenticated()}
          />
        ),
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
    ],
  },
])

export default Router
