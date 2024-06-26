import { useEffect, useState } from 'react'
import { IUser } from '../../../interfaces/model/user'
import ApiUser from '../../../apis/kang-blogging/user'
import { IBlogMetadata } from '../../../interfaces/model/blog_metadata'
import { useNavigate, useParams } from 'react-router-dom'
import Loader from '../../../common/loader'

interface Props {
  user_id: string
}

export const CardProfile = ({ user_id }: Props) => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [user, setUser] = useState<IUser>()
  const [blogs, setBlogs] = useState<IBlogMetadata[]>()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    ApiUser.getUserDetail(user_id)
      .then((rs) => {
        setUser(rs.data.data.user)
        setBlogs(rs.data.data.blogs)
        setIsLoading(false)
      })
      .catch((err) => {
        console.error(err)
      })
  }, [user_id])

  const handleClickNavigateMoreBlock = (blog_id: string) => {
    navigate(`/blog/${blog_id}`)
  }

  if (isLoading) {
    return <Loader />
  }
  return (
    <div className="flex flex-col space-y-1 bg-gray-100">
      <div className="flex flex-col pt-5 pb-5 text-left font-semibold text-xl tracking-tight mb-5 bg-white rounded-xl shadow-md overflow-hidden">
        <div className="flex flex-col space-y-5 ml-3 ">
          <div className="flex space-x-3 items-center line-clamp-3">
            <img
              className="w-10 h-10 rounded-full mr-2"
              src={user?.userInfo.avatar ?? ''}
            />
            <div className="flex-col justify-center">
              <p className="text-gray-900 leading-none font-semibold text-base tracking-tigh cursor-pointer hover:text-blue-900">
                {user?.userInfo.name}
              </p>
            </div>
          </div>
          <div className="flex flex-col space-y-5 text-xs justify-start items-start">
            <div className="flex flex-col text-left ">
              <p className="font-bold ">Username</p>
              <p className="text-gray-400">{user?.userInfo.displayName}</p>
            </div>
            <div className="flex flex-col text-left ">
              <p className="font-bold ">Email</p>
              <p className="text-gray-400">{user?.email}</p>
            </div>
            <div className="flex flex-col text-left ">
              <p className="font-bold ">Gender</p>
              <p className="text-gray-400">{user?.gender ? 'Male' : 'Female'}</p>
            </div>
            <div className="flex flex-col text-left ">
              <p className="font-bold ">Total Blogs</p>
              <p className="text-gray-400">{user?.totalBlogs}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col bg-white pt-5 pb-5 text-left font-semibold text-xl tracking-tight mb-5 rounded-xl shadow-md">
        <div className="flex flex-col space-y-5 ml-3 ">
          <div className="flex space-x-3 items-center line-clamp-3">
            <p className="text-base leading-normal">More from: </p>
            <div className="flex-col justify-center">
              <p className="text-gray-900 leading-none font-semibold text-base tracking-tigh cursor-pointer hover:text-blue-900">
                {user?.userInfo.name}
              </p>
            </div>
          </div>
          <div className="flex flex-col space-y-5 divide-y text-xs justify-start items-start">
            {blogs?.map((blog) => {
              if (blog.id == id) {
                return
              }
              return (
                <BlogShowMore
                  key={blog.id}
                  blog={blog}
                  callBack={handleClickNavigateMoreBlock}
                />
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

interface BlogShowMoreProps {
  blog: IBlogMetadata
  callBack: any
}

const BlogShowMore = ({ blog, callBack }: BlogShowMoreProps) => {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col space-y-2 px-2">
      <p
        onClick={() => {
          callBack(blog.id)
        }}
        className="text-base mt-3 hover:text-blue-900 cursor-pointer">
        {blog.name}
      </p>
      <div className="flex-wrap overflow-hidden">
        {blog.categories.map((category) => {
          return (
            <a
              onClick={() => {
                navigate(
                  `/category/${category.id}?n=${category.name}&t=${category.blogCount}`,
                )
              }}
              key={category.id}
              className="mt-1 bg-blue-100 hover:bg-blue-200 text-xs font-medium me-2 px-1 py-0.5 rounded dark:bg-white dark:text-blue-400 border border-blue-400 inline-flex items-center justify-center cursor-pointer">
              {category.name}
            </a>
          )
        })}
      </div>
    </div>
  )
}
