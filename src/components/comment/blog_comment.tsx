import { IComment, ICommentWithReplies } from '../../interfaces/model/comment'
import { useState } from 'react'
import { CreateBlogCommentRequest } from '../../interfaces/request/comment_request'
import { useNavigate } from 'react-router-dom'
import { FormatTimestampToDate } from '../../utils/convert'
import CommentBox from '../comment_box'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { ButtonSettingComment } from './button_setting_comment'
import { ButtonReportComment } from './button_report_comment'
import ApiComment from '../../apis/kang-blogging/comment'
import { MapErrorResponse } from '../../utils/map_data_response'
import { AxiosError } from 'axios'
import { setNotify } from '../../redux/reducers/notify'

interface Props {
  comment: ICommentWithReplies
  replyTheComment: any
}

export const BlogComment = ({ comment, replyTheComment }: Props) => {
  const [isShowTextBox, setIsShowTextBox] = useState(false)
  const [yourComment, setYourComment] = useState('')
  const [openEditor, setOpenEditor] = useState(false)
  const [commentEdited, setCommentEdited] = useState(comment.comment.content)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const userState = useAppSelector((state) => state.user)
  const [deleted, setDeleted] = useState(false)

  const updateComment = (content: string) => {
    ApiComment.updateComment(comment.comment.id, { content: content })
      .then((rs) => {
        comment.comment.content = rs.data.data.comment.content
        setOpenEditor(false)
      })
      .catch((e) => {
        const err = MapErrorResponse((e as AxiosError).response)
        dispatch(
          setNotify({
            title: 'an occurred error',
            description: err.message,
            mustShow: true,
          }),
        )
      })
  }

  const deleteComment = () => {
    ApiComment.deleteComment(comment.comment.id)
      .then(() => {
        setDeleted(true)
      })
      .catch((e) => {
        const err = MapErrorResponse((e as AxiosError).response)
        dispatch(
          setNotify({
            title: 'an occurred error',
            description: err.message,
            mustShow: true,
          }),
        )
      })
  }

  const reportComment = () => {
    navigate(`/report?type=comment&target_id=${comment.comment.id}`)
  }

  if (deleted) {
    return <></>
  }
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
              <p>{FormatTimestampToDate(comment.comment.createdAt)}</p>
            </p>
          </div>
          {userState.user?.id == comment.comment.user.id ? (
            <ButtonSettingComment
              handlerEdit={() => {
                setOpenEditor(true)
              }}
              handlerDelete={() => {
                deleteComment()
              }}
            />
          ) : (
            <ButtonReportComment reportComment={reportComment} />
          )}
        </footer>
        {openEditor ? (
          <CommentBox
            yourComment={commentEdited}
            setYourComment={setCommentEdited}
            handleSubmit={() => {
              if (commentEdited != '') {
                updateComment(commentEdited)
              }
            }}
            handleDismiss={() => {
              setOpenEditor(false)
            }}
          />
        ) : (
          <div className="border border-gray-200 rounded-md bg-gray-100">
            <p className="text-gray-500 pt-5 pb-5 text-left ml-10">
              {comment.comment.content}
            </p>
          </div>
        )}

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
          <div className={`absolute: ${isShowTextBox ? 'block' : 'hidden'} mb-6`}>
            <CommentBox
              yourComment={yourComment}
              setYourComment={setYourComment}
              handleSubmit={() => {
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
              handleDismiss={() => {
                setIsShowTextBox(false)
              }}
            />
          </div>
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
  const dispatch = useAppDispatch()
  const [openEditor, setOpenEditor] = useState(false)
  const [commentEdited, setCommentEdited] = useState(comment.content)
  const [deleted, setDeleted] = useState(false)
  const userState = useAppSelector((state) => state.user)

  const deleteComment = () => {
    ApiComment.deleteComment(comment.id)
      .then(() => {
        setDeleted(true)
      })
      .catch((e) => {
        const err = MapErrorResponse((e as AxiosError).response)
        dispatch(
          setNotify({
            title: 'an occurred error',
            description: err.message,
            mustShow: true,
          }),
        )
      })
  }

  const updateComment = (content: string) => {
    ApiComment.updateComment(comment.id, { content: content })
      .then((rs) => {
        comment.content = rs.data.data.comment.content
        setOpenEditor(false)
      })
      .catch((e) => {
        const err = MapErrorResponse((e as AxiosError).response)
        dispatch(
          setNotify({
            title: 'an occurred error',
            description: err.message,
            mustShow: true,
          }),
        )
      })
  }

  const reportComment = () => {
    navigate(`/report?type=comment&target_id=${comment.id}`)
  }

  if (deleted) {
    return <></>
  }
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
            <p>{FormatTimestampToDate(comment.createdAt)}</p>
          </p>
        </div>
        {userState.user?.id == comment.user.id ? (
          <ButtonSettingComment
            handlerEdit={() => {
              setOpenEditor(true)
            }}
            handlerDelete={() => {
              deleteComment()
            }}
          />
        ) : (
          <ButtonReportComment reportComment={reportComment} />
        )}
      </footer>
      {openEditor ? (
        <CommentBox
          yourComment={commentEdited}
          setYourComment={setCommentEdited}
          handleSubmit={() => {
            if (commentEdited != '') {
              updateComment(commentEdited)
            }
          }}
          handleDismiss={() => {
            setOpenEditor(false)
          }}
        />
      ) : (
        <div className="border border-gray-200 rounded-md bg-gray-100">
          <p className="text-gray-500 pt-5 pb-5 text-left ml-10">{comment.content}</p>
        </div>
      )}
    </article>
  )
}
