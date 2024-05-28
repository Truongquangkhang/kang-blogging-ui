import { useNavigate } from 'react-router-dom'
import { IUSerMetadata } from '../../interfaces/model/user_metadata'

interface Props {
  user: IUSerMetadata
}

const UserCard = ({ user }: Props) => {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col  items-start rounded-md border border-gray-100 bg-white px-4 py-3 shadow-lg">
      <div className="flex items-center">
        <img
          className="h-10 w-10 rounded-full object-cover"
          src={user.avatar}
          alt="Simon Lewis"
        />
        <strong
          onClick={() => {
            navigate(`/user/${user.id}`)
          }}
          className="ml-2 block text-xs font-medium cursor-pointer hover:text-blue-900">
          {user.displayName}
        </strong>
      </div>
      <div>
        <strong
          onClick={() => {
            navigate(`/user/${user.id}`)
          }}
          className="ml-12 block text-lg font-medium cursor-pointer hover:text-blue-900">
          {user.name}
        </strong>
      </div>
      <div className="flex items-start ml-12 mt-3">
        <p className="text-x text-gray-400">Bio: {user.description}</p>
      </div>
    </div>
  )
}

export default UserCard
