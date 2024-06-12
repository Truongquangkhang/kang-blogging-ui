import { IComment, ICommentWithReplies } from '../../interfaces/model/comment'
import { useState } from 'react'
import { CreateBlogCommentRequest } from '../../interfaces/request/comment_request'
import { useNavigate } from 'react-router-dom'

interface Props {
  comment: ICommentWithReplies
  replyTheComment: any
}

export const BlogComment = ({ comment, replyTheComment }: Props) => {
  const [isShowTextBox, setIsShowTextBox] = useState(false)
  const [yourComment, setYourComment] = useState('')
  const navigate = useNavigate()
  return (
    <div>
      <article className="p-6 text-base bg-white rounded-lg">
        <footer className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            <p className="inline-flex items-center mr-3 text-sm text-gray-900  font-semibold">
              <img
                className="mr-2 w-6 h-6 rounded-full"
                src={comment.comment.user.avatar}
                alt={comment.comment.user.displayName}
              />
              <p
                onClick={() => {
                  navigate(`/user/${comment.comment.user.id}`)
                }}
                className="cursor-pointer hover:text-blue-900">
                {comment.comment.user.displayName}
              </p>
            </p>
            <p className="text-sm text-gray-600">
              <time title="February 8th, 2022">Feb. 8, 2022</time>
            </p>
          </div>
          <ButtonSettingComment />
        </footer>
        <div className="border border-gray-200 rounded-md bg-gray-100">
          <p className="text-gray-500 pt-5 pb-5 text-left ml-10">
            {comment.comment.content}
          </p>
        </div>

        <div className="flex-col items-center mt-4 space-x-4">
          <button
            type="button"
            onClick={() => {
              setIsShowTextBox(true)
            }}
            className={`absolute: ${
              !isShowTextBox ? 'block' : 'hidden'
            } flex items-center text-sm text-gray-500 hover:underline  font-medium`}>
            <svg
              className="mr-1.5 w-3.5 h-3.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 18">
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
              />
            </svg>
            Reply
          </button>
          <form className={`absolute: ${isShowTextBox ? 'block' : 'hidden'} mb-6`}>
            <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200">
              <label className="sr-only">Your comment</label>
              <textarea
                id="comment"
                value={yourComment}
                onChange={(e) => {
                  setYourComment(e.target.value)
                }}
                rows={6}
                className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none"
                placeholder="Write a comment..."
                required></textarea>
            </div>
            <div className="flex space-x-3">
              <button
                type="button"
                onClick={() => {
                  if (yourComment != '') {
                    var request: CreateBlogCommentRequest = {
                      content: yourComment,
                      reply_comment_id: comment.comment.id,
                    }
                    replyTheComment(request)
                    setIsShowTextBox(false)
                    setYourComment('')
                  }
                }}
                className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center  bg-blue-800 text-white hover:bg-blue-900 rounded-lg focus:ring-4 focus:ring-primary-200">
                Submit
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsShowTextBox(false)
                }}
                className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center bg-gray-300 rounded-lg focus:ring-4 focus:ring-primary-200 hover:bg-gray-400">
                Dismiss
              </button>
            </div>
          </form>
        </div>
      </article>
      {comment.replies.map((reply) => {
        return (
          <ReplyComment
            key={reply.id}
            comment={reply}
          />
        )
      })}
    </div>
  )
}

interface ReplyCommentProps {
  comment: IComment
}

export const ReplyComment = ({ comment }: ReplyCommentProps) => {
  const navigate = useNavigate()
  return (
    <article className="p-6 mb-3 ml-6 lg:ml-12 text-base bg-white rounded-lg">
      <footer className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <p className="inline-flex items-center mr-3 text-sm text-gray-900  font-semibold">
            <img
              className="mr-2 w-6 h-6 rounded-full"
              src={comment.user.avatar}
              alt={comment.user.displayName}
            />
            <p
              onClick={() => {
                navigate(`/user/${comment.user.id}`)
              }}
              className="cursor-pointer hover:text-blue-900">
              {comment.user.displayName}
            </p>
          </p>
          <p className="text-sm text-gray-600 ">
            <time title="February 12th, 2022">Feb. 12, 2022</time>
          </p>
        </div>
        <ButtonSettingComment />
      </footer>
      <div className="border border-gray-200 rounded-md  bg-gray-100">
        <p className="text-gray-500 pt-5 pb-5 text-left ml-10">{comment.content}</p>
      </div>
    </article>
  )
}

export const ButtonSettingComment = () => {
  return (
    <>
      <button
        id="dropdownComment1Button"
        data-dropdown-toggle="dropdownComment1"
        className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500  bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50"
        type="button">
        <svg
          className="w-4 h-4"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 16 3">
          <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
        </svg>
        <span className="sr-only">Comment settings</span>
      </button>
      <div
        id="dropdownComment1"
        className="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow  ">
        <ul
          className="py-1 text-sm text-gray-700 "
          aria-labelledby="dropdownMenuIconHorizontalButton">
          <li>
            <a
              href="#"
              className="block py-2 px-4 hover:bg-gray-100  ">
              Edit
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block py-2 px-4 hover:bg-gray-100  ">
              Remove
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block py-2 px-4 hover:bg-gray-100  ">
              Report
            </a>
          </li>
        </ul>
      </div>
    </>
  )
}
