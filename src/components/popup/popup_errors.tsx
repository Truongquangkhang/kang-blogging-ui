import { useEffect } from 'react'
import { INotify } from '../../interfaces/model/notify'
import { useAppDispatch } from '../../hooks'
import { setNotify } from '../../redux/reducers/notify'

export enum TypeStatusNotification {
  'success',
  'error',
  'warning',
}

interface Props {
  notify: INotify
}

export const PopupError = ({ notify }: Props) => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    let countTimeout: any

    if (notify.mustShow) {
      countTimeout = setTimeout(() => {
        dispatch(setNotify({ description: '', title: '', mustShow: false }))
      }, 4000)
    } else {
      clearTimeout(countTimeout)
    }

    return () => {
      clearTimeout(countTimeout)
    }
  }, [notify.mustShow])

  if (notify.mustShow)
    return (
      <div
        className="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md"
        role="alert">
        <div className="flex">
          <div className="py-1">
            <svg
              className="fill-current h-6 w-6 text-teal-500 mr-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20">
              <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
            </svg>
          </div>
          <div>
            <p className="font-bold">{notify.title}</p>
            <p className="text-sm">{notify.description}</p>
          </div>
        </div>
      </div>
    )
}
