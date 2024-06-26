import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { IComment } from '../../interfaces/model/comment'
import { FormatTimestampToDate } from '../../utils/convert'
import Loader from '../../common/loader'
import ApiComment from '../../apis/kang-blogging/comment'
import { useAppDispatch } from '../../hooks'
import { setNotify } from '../../redux/reducers/notify'
import { MapErrorResponse } from '../../utils/map_data_response'
import { AxiosError } from 'axios'

const CommentDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [comment, setComment] = useState<IComment>()
  const [words, setWords] = useState<string[]>([])
  const [toxicIndexes, setToxicIndexes] = useState<number[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    ApiComment.getComment(id ?? '')
      .then((rs) => {
        setComment(rs.data.data.comment)
        if (rs.data.data.content_processed) {
          var w = rs.data.data.content_processed?.split(' ')
          setWords(w)
        } else {
          var w = rs.data.data.comment.content?.split(' ')
          setWords(w)
        }

        if (rs.data.data.predictions.length > 0) {
          setToxicIndexes(rs.data.data.predictions)
        } else {
          setToxicIndexes(Array(rs.data.data.comment.content.split(' ').length).fill(0))
        }
      })
      .catch((error) => {
        const e = MapErrorResponse((error as AxiosError).response)
        dispatch(
          setNotify({
            title: 'an occurred error',
            description: e.message,
            mustShow: true,
          }),
        )
      })
      .finally(() => {
        setIsLoading(false)
      })
  })

  if (isLoading) {
    return <Loader />
  }

  return (
    <div className="flex flex-col p-5 space-y-5 w-full justify-between items-center">
      <p className="text-xl font-semibold">Comment</p>
      <article className="p-6 text-base bg-white rounded-lg w-full">
        <footer className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            <p className="inline-flex items-center mr-3 text-sm text-gray-900  font-semibold">
              <img
                className="mr-2 w-6 h-6 rounded-full"
                src={comment?.user.avatar}
                alt={comment?.user.displayName}
              />
              <p
                onClick={() => {
                  navigate(`/user/${comment?.user.id}`)
                }}
                className="cursor-pointer hover:text-blue-900">
                {comment?.user.displayName}
              </p>
            </p>
            <p className="text-sm text-gray-600">
              <p>{FormatTimestampToDate(comment?.createdAt ?? 0)}</p>
            </p>
          </div>
        </footer>
        {comment?.isToxicity ? (
          <p className="text-red-400 text-xs text-left mb-3">This comment is toxic</p>
        ) : (
          <div></div>
        )}
        <div className="border border-gray-50  rounded-md bg-slate-50">
          <div className="flex flex-wrap max-w-full p-5">
            {words.map((word, index) => (
              <span
                key={index}
                className={`${toxicIndexes[index] ? 'text-red-400' : 'text-black'}`}
                style={{
                  marginRight: '5px',
                  cursor: 'pointer',
                }}>
                {word}
              </span>
            ))}
          </div>
        </div>
      </article>
    </div>
  )
}

export default CommentDetail
