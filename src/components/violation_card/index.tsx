import { useNavigate } from 'react-router-dom'
import { FormatRelativeTime } from '../../utils/convert'
import { IViolation } from '../../interfaces/model/violation'

interface Prop {
  violation: IViolation
}

const ViolationCard = (prop: Prop) => {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col items-start rounded-md border border-gray-100 bg-white px-4 py-3 shadow-lg">
      <div className="flex items-center w-full justify-between">
        <div className="flex items-center space-x-2">
          <img
            className="h-10 w-10 rounded-full object-cover border border-gray-200"
            src={prop.violation.user.avatar}
            alt="Simon Lewis"
          />
          <strong
            onClick={() => {
              navigate(`/user/${prop.violation.user.id}`)
            }}
            className="ml-3 block text-xs font-medium cursor-pointer hover:text-blue-900">
            @{prop.violation.user.displayName}
          </strong>
        </div>
        <div className="flex-col space-y-1">
          <div>
            <p
              onClick={() => {
                if (prop.violation.type == 'comment') {
                  navigate(`/comment/${prop.violation.targetId}`)
                }
              }}
              className="text-xs text-blue-600 cursor-pointer hover:text-blue-900">
              Your comment is toxic
            </p>
          </div>
          <p className="text-xs">{FormatRelativeTime(prop.violation.createdAt)}</p>
        </div>
      </div>
      <div className="p-2 ml-10 text-left">
        <strong>{prop.violation.description}</strong>
      </div>
    </div>
  )
}

export default ViolationCard
