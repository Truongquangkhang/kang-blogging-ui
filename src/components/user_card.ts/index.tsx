import { useNavigate } from 'react-router-dom'
import { IUser } from '../../interfaces/model/user'

interface Props {
  user: IUser
}

const UserCard = ({ user }: Props) => {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col  items-start rounded-md border border-gray-100 bg-white px-4 py-3 shadow-lg">
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

      <div className="flex items-start ml-12 mt-3">
        <p className="text-x text-gray-400">Bio: {user.userInfo.description}</p>
      </div>
    </div>
  )
}

export default UserCard
