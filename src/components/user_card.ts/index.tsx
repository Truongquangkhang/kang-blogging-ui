import { useNavigate } from 'react-router-dom'
import { IUser } from '../../interfaces/model/user'
import { RiBook2Line } from 'react-icons/ri'
import { AiOutlineMessage } from 'react-icons/ai'
import { GoPeople } from 'react-icons/go'
import ApiUser from '../../apis/kang-blogging/user'
import { useAppDispatch } from '../../hooks'
import { MapErrorResponse } from '../../utils/map_data_response'
import { AxiosError } from 'axios'
import { setNotify } from '../../redux/reducers/notify'
import { useState } from 'react'

interface Props {
  user: IUser
}

const UserCard = ({ user }: Props) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [isFollowed, setIsFollowed] = useState(user.isFollowed)

  const followUser = () => {
    ApiUser.followUser(user.userInfo.id)
      .then(() => {
        user.totalFollowers += 1
        setIsFollowed(true)
      })
      .catch((error) => {
        const e = MapErrorResponse((error as AxiosError).response)
        dispatch(
          setNotify({
            title: 'An occurred error',
            description: e.message,
            mustShow: true,
          }),
        )
      })
  }

  const unfollowUser = () => {
    ApiUser.unfollowUser(user.userInfo.id)
      .then(() => {
        user.totalFollowers -= 1
        setIsFollowed(false)
      })
      .catch((error) => {
        const e = MapErrorResponse((error as AxiosError).response)
        dispatch(
          setNotify({
            title: 'An occurred error',
            description: e.message,
            mustShow: true,
          }),
        )
      })
  }

  return (
    <div className="flex flex-col  items-start rounded-md border border-gray-100 bg-white px-4 py-3 shadow-lg">
      <div className="flex justify-between w-full">
        <div className="flex items-center">
          <img
            className="h-10 w-10 rounded-full object-cover"
            src={user.userInfo.avatar}
            alt="Simon Lewis"
          />
          <div className="flex flex-col text-left">
            <strong
              onClick={() => {
                navigate(`/user/${user.userInfo.id}`)
              }}
              className="ml-3 block text-xs font-medium cursor-pointer hover:text-blue-900">
              @{user.userInfo.displayName}
            </strong>
            <strong className="ml-3 block text-sm text-gray-500 font-medium">
              {user.userInfo.name}
            </strong>
          </div>
        </div>
        {!isFollowed ? (
          <button
            onClick={() => {
              followUser()
            }}
            className="text-white px-3 py-1 rounded-lg font-semibold bg-blue-800 hover:bg-blue-900 cursor-pointer">
            Follow
          </button>
        ) : (
          <button
            onClick={() => {
              unfollowUser()
            }}
            className="text-white px-3 py-1 rounded-lg font-semibold bg-gray-400 hover:bg-gray-500 cursor-pointer">
            Unfollow
          </button>
        )}
      </div>

      <div className="flex items-start ml-12 mt-3">
        <p className="text-x text-gray-400">Bio: {user.userInfo.description}</p>
      </div>
      <div className="ml-12 flex space-x-7 mt-5">
        <div className="flex space-x-1 items-center">
          <RiBook2Line />
          <p className="text-gray-500 text-xs">{user.totalBlogs}</p>
        </div>
        <div className="flex space-x-1 items-center">
          <AiOutlineMessage />
          <p className="text-gray-500 text-xs">{user.totalComments}</p>
        </div>
        <div className="flex space-x-1 items-center">
          <GoPeople />
          <p className="text-gray-500 text-xs">{user.totalFollowers}</p>
        </div>
      </div>
    </div>
  )
}

export default UserCard
