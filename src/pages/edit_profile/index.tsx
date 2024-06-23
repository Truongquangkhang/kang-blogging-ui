import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import EditProfile from './components/edit_profile'
import EditAccount from './components/edit_account'
import { useEffect, useState } from 'react'
import { IUSerMetadata } from '../../interfaces/model/user_metadata'
import ApiUser from '../../apis/kang-blogging/user'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { setNotify } from '../../redux/reducers/notify'
import { MapErrorResponse } from '../../utils/map_data_response'
import { AxiosError } from 'axios'
import Loader from '../../common/loader'

const TabNames = ['Profile', 'Account']
const EditUser = () => {
  const { id } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<IUSerMetadata>()
  const userState = useAppSelector((state) => state.user)

  const tab = searchParams.get('tab')
  if (tab == null) {
    searchParams.set('tab', 'Profile')
    setSearchParams(searchParams)
  }

  useEffect(() => {
    const fetchUserByID = (id: string) => {
      ApiUser.getUserDetail(id)
        .then((rs) => {
          if (!rs.data.data.canEdit) {
            dispatch(
              setNotify({
                title: 'an occurred error',
                description: "you don't have permisson",
                mustShow: true,
              }),
            )
            navigate(`/user/${id}`)
          } else {
            setUser(rs.data.data.user.userInfo)
          }
        })
        .catch((error) => {
          const err = MapErrorResponse((error as AxiosError).response)
          dispatch(
            setNotify({
              title: 'an occurred error',
              description: err.message,
              mustShow: true,
            }),
          )
        })
        .finally(() => {
          setIsLoading(false)
        })
    }

    if (id) {
      fetchUserByID(id)
    } else {
      fetchUserByID(userState.user?.id ?? '')
    }
  }, [])

  const RenderByTab = (tab: string) => {
    if (tab == 'Account') {
      return <EditAccount />
    }
    return <EditProfile user={user} />
  }

  if (isLoading) {
    return <Loader />
  }

  return (
    <div className="flex w-full justify-center items-center">
      <div className="flex w-3/4 p-10 space-x-5">
        <div className="max-w-screen-md mx-auto w-1/4">
          <div className="py-2 px-3">
            <nav className="flex flex-col gap-4">
              {TabNames.map((tab) => {
                if (tab == searchParams.get('tab')) {
                  return (
                    <a
                      key={tab}
                      className="cursor-pointer inline-flex whitespace-nowrap border-b-2 border-transparent border-b-blue-900 py-2 px-3 text-sm font-semibold text-blue-900 transition-all duration-200 ease-in-out">
                      {' '}
                      {tab}{' '}
                    </a>
                  )
                } else {
                  return (
                    <a
                      key={tab}
                      onClick={() => {
                        var temp = searchParams
                        temp.set('tab', tab)
                        setSearchParams(temp)
                      }}
                      className="cursor-pointer inline-flex whitespace-nowrap border-b-2 border-transparent py-2 px-3 text-sm font-medium text-gray-600 transition-all duration-200 ease-in-out hover:border-b-blue-900 hover:text-blue-900">
                      {' '}
                      {tab}{' '}
                    </a>
                  )
                }
              })}
            </nav>
          </div>
        </div>
        <div className="w-3/4">{RenderByTab(tab ?? '')}</div>
      </div>
    </div>
  )
}

export default EditUser
