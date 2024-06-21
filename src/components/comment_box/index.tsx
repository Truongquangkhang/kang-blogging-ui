import { useState } from 'react'
import ApiDetectContent from '../../apis/toxicity-detection/detect_content'
import { useAppDispatch } from '../../hooks'
import { setNotify } from '../../redux/reducers/notify'
import PopUpConfirm from './popup_confirm'

interface Props {
  yourComment: string
  setYourComment: any
  handleSubmit: any
  handleDismiss: any
}

const CommentBox = ({
  yourComment,
  setYourComment,
  handleSubmit,
  handleDismiss,
}: Props) => {
  const [timeoutId, setTimeoutId] = useState<number | null>(null)
  const [toxicComment, setToxicComment] = useState('')
  const [predictions, setPredictions] = useState<number[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [openPopupConfirm, setOpenPopupConfirm] = useState(false)

  const dispatch = useAppDispatch()

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target
    setIsLoading(true)
    setYourComment(value)
    if (toxicComment != '') {
      setToxicComment('')
      setPredictions([])
    }
    if (timeoutId) {
      window.clearTimeout(timeoutId)
    }
    const newTimeoutId = window.setTimeout(() => {
      ApiDetectContent.detectContent(e.target.value)
        .then((rs) => {
          if (rs.data.predictions.includes(1)) {
            setToxicComment(rs.data.text)
            setPredictions(rs.data.predictions)
          }
        })
        .catch(() => {
          dispatch(
            setNotify({ title: 'an occurred error', description: '', mustShow: true }),
          )
        })
        .finally(() => {
          setIsLoading(false)
        })
    }, 2000)
    setTimeoutId(newTimeoutId)
  }

  const getHighlightedText = (text: string, prediction: number[]) => {
    const words = text.split(' ')
    return prediction.map((value, index) => (
      <span
        key={index}
        className={value === 1 ? 'text-red-500' : ''}>
        {words[index]}{' '}
      </span>
    ))
  }
  return (
    <div>
      <form className="mb-6">
        {toxicComment != '' && predictions.length > 0 ? (
          <div className="flex-col mt-4 mb-3 text-left items-center">
            <p className="text-sm text-gray-500">{'Your comment is toxic:'}</p>
            <div>{getHighlightedText(toxicComment, predictions)}</div>
          </div>
        ) : (
          <div></div>
        )}
        <div
          className={`${
            toxicComment != '' && predictions.length > 0
              ? 'border-red-400'
              : 'border-gray-400'
          } py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border`}>
          <label className="sr-only">Your comment</label>
          <textarea
            id="comment"
            rows={6}
            className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none"
            placeholder="Write a comment..."
            value={yourComment}
            onChange={handleChange}
            required></textarea>
        </div>
        <div className="flex space-x-3">
          <button
            type="button"
            onClick={() => {
              if (toxicComment != '' || predictions.length > 0) {
                setOpenPopupConfirm(true)
              } else {
                handleSubmit()
              }
            }}
            disabled={isLoading}
            className={`inline-flex ${
              isLoading ? 'cursor-not-allowed opacity-50' : ''
            } bg-blue-800 text-white hover:bg-blue-900 items-center py-2.5 px-4 text-xs font-medium text-center bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 hover:bg-primary-800`}>
            {isLoading ? 'Loading...' : 'Submit'}
          </button>
          <button
            onClick={() => {
              handleDismiss()
              setToxicComment('')
              setPredictions([])
            }}
            type="button"
            className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center bg-gray-300 rounded-lg focus:ring-4 focus:ring-primary-200 hover:bg-gray-400">
            Dismiss
          </button>
        </div>
      </form>
      <PopUpConfirm
        openPopUp={openPopupConfirm}
        closePopUp={() => {
          setOpenPopupConfirm(false)
        }}
        handleConfirm={() => {
          handleSubmit()
          setToxicComment('')
          setPredictions([])
        }}
      />
    </div>
  )
}

export default CommentBox
