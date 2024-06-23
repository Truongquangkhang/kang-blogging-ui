import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import {
  FormatRelativeTime,
  FormatTimestampToDate,
  FormatTimestampToDatetime,
} from '../../utils/convert'
import { RiBook2Line } from 'react-icons/ri'
import { AiOutlineMessage } from 'react-icons/ai'
import { PiWarning } from 'react-icons/pi'
import { GoPeople, GoHeart } from 'react-icons/go'
import { useEffect, useState } from 'react'
import ApiUser from '../../apis/kang-blogging/user'
import { IUser } from '../../interfaces/model/user'
import { useAppDispatch, useAppSelector } from '../../hooks'
import Loader from '../../common/loader'
import { ICommentMetadata } from '../../interfaces/model/comment'
import ListBlog from '../home/components/list_blog'
import ListComments from '../discussion/components/list_comments'
import ListUsers from '../search/components/list_users'
import { MapErrorResponse } from '../../utils/map_data_response'
import { AxiosError } from 'axios'
import { setNotify } from '../../redux/reducers/notify'
import { IoIosWarning } from 'react-icons/io'
import { Tooltip } from '@mui/material'

const TypeTab = {
  ['selected']:
    'w-full cursor-pointer inline-flex whitespace-nowrap border-b-2 border-transparent border-b-blue-900 py-2 px-3 text-sm font-semibold text-blue-900 transition-all duration-200 ease-in-ou',
  ['unselect']:
    'w-full cursor-pointer inline-flex whitespace-nowrap border-b-2 border-transparent py-2 px-3 text-sm font-medium text-gray-600 transition-all duration-200 ease-in-out hover:border-b-blue-900 hover:text-blue-900',
}

const UserProfile = () => {
  const { id } = useParams()
  const [user, setUser] = useState<IUser>()
  const [isFollowed, setIsFollowed] = useState(false)
  const [comments, setComments] = useState<ICommentMetadata[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const userStates = useAppSelector((state) => state.user)
  const [searchParam, setSearchParams] = useSearchParams()
  const [canEdit, setCanEdit] = useState(false)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  var tab = searchParam.get('tab')
  if (tab == null) {
    searchParam.set('tab', 'blog')
    setSearchParams(searchParam)
  }

  const followUser = () => {
    ApiUser.followUser(id ?? '')
      .then(() => {
        setIsFollowed(true)
      })
      .catch((error) => {
        const e = MapErrorResponse((error as AxiosError).response)
        dispatch(
          setNotify({
            title: 'An occurred error',
            description: e.message,
            mustShow: true,
          }),
        )
      })
  }

  const unfollowUser = () => {
    ApiUser.unfollowUser(id ?? '')
      .then(() => {
        setIsFollowed(false)
      })
      .catch((error) => {
        const e = MapErrorResponse((error as AxiosError).response)
        dispatch(
          setNotify({
            title: 'An occurred error',
            description: e.message,
            mustShow: true,
          }),
        )
      })
  }

  useEffect(() => {
    ApiUser.getUserDetail(id ?? '')
      .then((rs) => {
        setUser(rs.data.data.user)
        setComments(rs.data.data.comments)
        setIsFollowed(rs.data.data.user.isFollowed)
        setIsLoading(false)
        setCanEdit(rs.data.data.canEdit)
      })
      .catch((err) => {
        const error = MapErrorResponse((err as AxiosError).response)
        dispatch(
          setNotify({
            title: 'An occurred error',
            description: error.message,
            mustShow: true,
          }),
        )
      })
  }, [id])

  const RenderByTab = (tab: string) => {
    switch (tab) {
      case 'comment':
        return (
          <div className="flex flex-col space-y-3">
            <ListComments
              UserIds={user?.userInfo.id}
              IsToxic={false}
            />
          </div>
        )
      case 'follower':
        return (
          <div className="flex flex-col space-y-3">
            <ListUsers FollowedId={user?.userInfo.id} />
          </div>
        )
      case 'followed':
        return (
          <div className="flex flex-col space-y-3">
            <ListUsers FollowerId={user?.userInfo.id} />
          </div>
        )
      default:
        return (
          <div className="flex flex-col space-y-3">
            <ListBlog
              AuthorIds={user?.userInfo.id}
              Published={userStates.user?.id == user?.userInfo.id ? null : true}
            />
          </div>
        )
    }
  }

  if (isLoading) {
    return <Loader />
  }
  return (
    <div className="flex flex-col p-10 justify-center items-center m-10">
      <div className="flex flex-col items-center justify-center w-full rounded-lg border border-gray-100 bg-white px-4 py-3 shadow-lg">
        <div className={`flex w-full justify-end mb-2`}>
          {canEdit ? (
            <button
              onClick={() => {
                navigate('/edit-profile')
              }}
              className="px-3 py-1 bg-blue-800 text-white rounded hover:bg-blue-900">
              Edit
            </button>
          ) : !isFollowed ? (
            <button
              onClick={() => {
                followUser()
              }}
              className="text-white px-3 py-1 rounded-lg font-semibold bg-blue-800 hover:bg-blue-900 cursor-pointer">
              Follow
            </button>
          ) : (
            <button
              onClick={() => {
                unfollowUser()
              }}
              className="text-white px-3 py-1 rounded-lg font-semibold bg-gray-400 hover:bg-gray-500 cursor-pointer">
              Unfollow
            </button>
          )}
        </div>
        <div className="flex flex-col  items-center border-b-2 pb-10 border-gray-300">
          <div className="relative">
            <img
              className="w-32 h-32 rounded-full"
              src={user?.userInfo.avatar}
            />
          </div>
          <strong className="mt-3 block text-xs text-gray-500 font-medium cursor-pointer hover:text-blue-900">
            @{user?.userInfo.displayName}
          </strong>
          {user?.userInfo.expireWarningTime != null ? (
            <div className="flex mt-2 items-center space-x-3">
              <IoIosWarning color="yellow" />
              <Tooltip
                title={`The user has been banned from commenting ${FormatTimestampToDatetime(
                  user.userInfo.expireWarningTime,
                )}`}>
                <p>Banned</p>
              </Tooltip>
            </div>
          ) : (
            <div></div>
          )}

          <strong className="mt-8 block text-2xl font-semibold cursor-pointer hover:text-blue-900">
            {user?.userInfo.name}
          </strong>
          <strong className="mt-3 block text-l text-gray-500 font-medium cursor-pointer hover:text-blue-900">
            {user?.userInfo.description}
          </strong>
        </div>
        <div className="flex space-x-10 p-5">
          <div className="flex-col">
            <label className="text-sm font-semibold">Joined On</label>
            <strong className="block text-l text-gray-500 font-medium">
              {FormatTimestampToDate(user?.createdAt ?? 0)}
            </strong>
          </div>
          <div className="flex-col">
            <label className="text-sm font-semibold">Email</label>
            <strong className="block text-l text-gray-500 font-medium">
              {user?.email}
            </strong>
          </div>
        </div>
      </div>

      <div className="flex w-full space-x-3 mt-3">
        <div className="w-1/4">
          <div className="flex-col space-y-3 p-2 h-fit rounded-lg border border-gray-100 bg-white px-4 py-3 shadow-lg">
            <div className="flex items-center space-x-4">
              <RiBook2Line />
              <strong
                onClick={() => {
                  searchParam.set('tab', 'blog')
                  setSearchParams(searchParam)
                }}
                className={tab == 'blog' ? TypeTab['selected'] : TypeTab['unselect']}>
                {user?.totalBlogs} posts published
              </strong>
            </div>
            <div className="flex items-center space-x-4">
              <AiOutlineMessage />
              <strong
                onClick={() => {
                  searchParam.set('tab', 'comment')
                  setSearchParams(searchParam)
                }}
                className={tab == 'comment' ? TypeTab['selected'] : TypeTab['unselect']}>
                {user?.totalComments} comments written
              </strong>
            </div>
            <div className="flex items-center space-x-4">
              <GoPeople />
              <strong
                onClick={() => {
                  searchParam.set('tab', 'follower')
                  setSearchParams(searchParam)
                }}
                className={tab == 'follower' ? TypeTab['selected'] : TypeTab['unselect']}>
                {user?.totalFollowers} total followers
              </strong>
            </div>
            <div className="flex items-center space-x-4">
              <GoHeart />
              <strong
                onClick={() => {
                  searchParam.set('tab', 'followed')
                  setSearchParams(searchParam)
                }}
                className={tab == 'followed' ? TypeTab['selected'] : TypeTab['unselect']}>
                {user?.totalFolloweds} total followeds
              </strong>
            </div>
            <div className="flex items-center space-x-4">
              <PiWarning />
              <strong
                onClick={() => {
                  searchParam.set('tab', 'violation')
                  setSearchParams(searchParam)
                }}
                className={
                  tab == 'violation' ? TypeTab['selected'] : TypeTab['unselect']
                }>
                {user?.totalViolations} total violations
              </strong>
            </div>
          </div>
          <div className="mt-5 flex-col space-y-3 h-fit divide-y rounded-lg border border-gray-100 bg-white px-4 py-5 shadow-lg">
            {comments.map((comment) => {
              return (
                <div
                  className="mt-3"
                  key={comment.id}>
                  <p className="truncate text-xs text-gray-500 font-medium text-left">
                    {comment.content}
                  </p>
                  <p className="text-xs text-left">
                    {FormatRelativeTime(comment.createdAt)}
                  </p>
                </div>
              )
            })}
          </div>
        </div>

        <div className=" w-3/4">{RenderByTab(tab ?? '')}</div>
      </div>
    </div>
  )
}

export default UserProfile
