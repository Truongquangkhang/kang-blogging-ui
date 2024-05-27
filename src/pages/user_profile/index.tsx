import { useParams } from 'react-router-dom'
import { FormatTimestampToDate } from '../../utils/convert'
import { RiBook2Line } from 'react-icons/ri'
import { AiOutlineMessage } from 'react-icons/ai'
import { useEffect, useState } from 'react'
import ApiUser from '../../apis/kang-blogging/user'
import { IUser } from '../../interfaces/model/user'
import BlogDetail from '../../components/blog_detail.ts/blog_detail'
import { useAppSelector } from '../../hooks'

const UserProfile = () => {
  const { id } = useParams()
  const [user, setUser] = useState<IUser>()
  const [isLoading, setIsLoading] = useState(true)
  const userStates = useAppSelector((state) => state.user)

  useEffect(() => {
    ApiUser.getUserDetail(id ?? '').then((rs) => {
      setUser(rs.data.data.user)
      setIsLoading(false)
    })
  }, [id])
  if (isLoading) {
    return <p>Loading...</p>
  }
  return (
    <div className="flex flex-col p-10 justify-center items-center m-10">
      <div className="flex flex-col items-center justify-center w-full rounded-lg border border-gray-100 bg-white px-4 py-3 shadow-lg">
        <div
          className={`absolute: ${
            userStates.user?.id == user?.userInfo.id ? 'block' : 'hidden'
          } flex w-full justify-end mb-2`}>
          <button className="px-3 py-1 bg-blue-800 text-white rounded hover:bg-blue-900">
            Edit Profile
          </button>
        </div>
        <div className="flex flex-col  items-center border-b-2 pb-10 border-gray-300">
          <img
            className="w-32 h-32 rounded-full"
            src={user?.userInfo.avatar}
          />
          <strong className="mt-3 block text-xs text-gray-500 font-medium cursor-pointer hover:text-blue-900">
            @{user?.userInfo.displayName}
          </strong>
          <strong className="mt-8 block text-2xl font-semibold cursor-pointer hover:text-blue-900">
            {user?.userInfo.name}
          </strong>
          <strong className="mt-3 block text-l text-gray-500 font-medium cursor-pointer hover:text-blue-900">
            {user?.userInfo.description}
          </strong>
        </div>
        <div className="flex space-x-10 p-5">
          <div className="flex-col">
            <label className="text-sm font-semibold">Joined On</label>
            <strong className="block text-l text-gray-500 font-medium">
              {FormatTimestampToDate(user?.createdAt ?? 0)}
            </strong>
          </div>
          <div className="flex-col">
            <label className="text-sm font-semibold">Email</label>
            <strong className="block text-l text-gray-500 font-medium">
              {user?.email}
            </strong>
          </div>
        </div>
      </div>
      <div className="flex w-full space-x-3 mt-3">
        <div className="flex-col space-y-3 p-2 w-1/4 rounded-lg border border-gray-100 bg-white px-4 py-3 shadow-lg">
          <div className="flex items-center space-x-4">
            <RiBook2Line />
            <strong className="block text-l text-gray-500 font-medium">
              {user?.userInfo.totalBlogs} posts published
            </strong>
          </div>
          <div className="flex items-center space-x-4">
            <AiOutlineMessage />
            <strong className="block text-l text-gray-500 font-medium">
              {10} comments written
            </strong>
          </div>
        </div>
        <div className="flex flex-col space-y-3 w-3/4">
          {user?.blogs.map((blog) => {
            return (
              <BlogDetail
                key={blog.id}
                blog={blog}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default UserProfile
