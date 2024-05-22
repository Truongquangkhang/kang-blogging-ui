import { useEffect, useState } from 'react'
import { IUser } from '../../../interfaces/model/user'
import ApiUser from '../../../apis/kang-blogging/user'

interface Props {
  user_id: string
}

export const CardProfile = ({ user_id }: Props) => {
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
  if (isLoading) {
    return <p>Loading...</p>
  }
  return (
    <div className="flex flex-col space-y-5 ml-3">
      <div className="flex space-x-3 items-center line-clamp-3">
        <img
          className="w-10 h-10 rounded-full mr-2"
          src={user?.userInfo.avatar ?? ''}
        />
        <div className="flex-col justify-center">
          <p className="text-gray-900 leading-none font-semibold text-xs tracking-tigh cursor-pointer hover:text-blue-900">
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
          <p className="text-gray-400">{user?.userInfo.totalBlogs}</p>
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
  )
}
