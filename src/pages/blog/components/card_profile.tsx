import { useEffect, useState } from 'react'
import { IUser } from '../../../interfaces/model/user'
import ApiUser from '../../../apis/kang-blogging/user'
import { IBlogMetadata } from '../../../interfaces/model/blog_metadata'
import { useNavigate, useParams } from 'react-router-dom'

interface Props {
  user_id: string
}

export const CardProfile = ({ user_id }: Props) => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [user, setUser] = useState<IUser>()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    ApiUser.getUserDetail(user_id)
      .then((rs) => {
        setUser(rs.data.data.user)
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
    return <p>Loading...</p>
  }
  return (
    <div className="flex flex-col space-y-1">
      <div className="flex flex-col pt-5 pb-5 text-left font-semibold text-xl tracking-tight mb-5 rounded-xl shadow-md overflow-hidden">
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
              <p className="text-gray-400">{user?.userInfo.email}</p>
            </div>
            <div className="flex flex-col text-left ">
              <p className="font-bold ">Gender</p>
              <p className="text-gray-400">{user?.userInfo.gender ? 'Male' : 'Female'}</p>
            </div>
            <div className="flex flex-col text-left ">
              <p className="font-bold ">Total Blogs</p>
              <p className="text-gray-400">{user?.userInfo.totalBlogs}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col pt-5 pb-5 text-left font-semibold text-xl tracking-tight mb-5 rounded-xl shadow-md overflow-hidden">
        <div className="flex flex-col space-y-5 ml-3 ">
          <div className="flex space-x-3 items-center line-clamp-3">
            <p className="text-base">More from: </p>
            <div className="flex-col justify-center">
              <p className="text-gray-900 leading-none font-semibold text-base tracking-tigh cursor-pointer hover:text-blue-900">
                {user?.userInfo.name}
              </p>
            </div>
          </div>
          <div className="flex flex-col space-y-5 text-xs justify-start items-start">
            {user?.blogs.map((blog) => {
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
  return (
    <div className="flex flex-col space-y-2">
      <p
        onClick={() => {
          callBack(blog.id)
        }}
        className="text-lg hover:text-blue-900 cursor-pointer">
        {blog.name}
      </p>
      <div className="flex">
        {blog.categories.map((category, index) => {
          if (index == 5) {
            return
          }
          return (
            <a
              key={category.id}
              className="bg-blue-100 hover:bg-blue-200 text-xs font-medium me-2 px-1 py-0.5 rounded dark:bg-white dark:text-blue-400 border border-blue-400 inline-flex items-center justify-center cursor-pointer">
              {category.name}
            </a>
          )
        })}
      </div>
    </div>
  )
}
