import { useNavigate } from 'react-router-dom'
import { ICommentItem } from '../../interfaces/model/comment'
import { FormatRelativeTime } from '../../utils/convert'
import { truncateString } from '../../utils/string'

interface Prop {
  comment: ICommentItem
}

const CommentCard = (prop: Prop) => {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col items-start rounded-md border border-gray-100 bg-white px-4 py-3 shadow-lg">
      <div className="flex items-center w-full justify-between">
        <div className="flex items-center space-x-2">
          <img
            className="h-10 w-10 rounded-full object-cover border border-gray-200"
            src={prop.comment.commentInfo.user.avatar}
            alt="Simon Lewis"
          />
          <strong
            onClick={() => {
              navigate(`/user/${prop.comment.commentInfo.user.id}`)
            }}
            className="ml-3 block text-xs font-medium cursor-pointer hover:text-blue-900">
            @{prop.comment.commentInfo.user.displayName}
          </strong>
        </div>
        <div className="flex-col space-y-1">
          <div>
            {prop.comment.replyCommentId == null ? (
              <p
                onClick={() => {
                  navigate(
                    `/blog/${prop.comment.blogId}?comment=${prop.comment.commentInfo.id}`,
                  )
                }}
                className="text-xs text-blue-600 cursor-pointer hover:text-blue-900">
                commented to the post
              </p>
            ) : (
              <p
                onClick={() => {
                  navigate(
                    `/blog/${prop.comment.blogId}?comment=${prop.comment.replyCommentId}`,
                  )
                }}
                className="text-xs text-blue-600 cursor-pointer hover:text-blue-900">
                reply to the comment
              </p>
            )}
          </div>
          <p className="text-xs">
            {FormatRelativeTime(prop.comment.commentInfo.createdAt)}
          </p>
        </div>
      </div>
      <div className="p-2 ml-10 text-left">
        <strong>{truncateString(prop.comment.commentInfo.content, 180)}</strong>
      </div>
    </div>
  )
}

export default CommentCard
