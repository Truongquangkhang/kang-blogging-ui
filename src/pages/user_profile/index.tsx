import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { FormatRelativeTime, FormatTimestampToDate } from '../../utils/convert'
import { RiBook2Line } from 'react-icons/ri'
import { AiOutlineMessage } from 'react-icons/ai'
import { PiWarning } from 'react-icons/pi'
import { GoPeople, GoHeart } from 'react-icons/go'
import { useEffect, useState } from 'react'
import ApiUser from '../../apis/kang-blogging/user'
import { IUser } from '../../interfaces/model/user'
import { useAppSelector } from '../../hooks'
import Loader from '../../common/loader'
import { ICommentMetadata } from '../../interfaces/model/comment'
import { IBlogMetadata } from '../../interfaces/model/blog_metadata'
import ListBlog from '../home/components/list_blog'
import ListComments from '../discussion/components/list_comments'
import ListUsers from '../search/components/list_users'

const TypeTab = {
  ['selected']:
    'w-full cursor-pointer inline-flex whitespace-nowrap border-b-2 border-transparent border-b-blue-900 py-2 px-3 text-sm font-semibold text-blue-900 transition-all duration-200 ease-in-ou',
  ['unselect']:
    'w-full cursor-pointer inline-flex whitespace-nowrap border-b-2 border-transparent py-2 px-3 text-sm font-medium text-gray-600 transition-all duration-200 ease-in-out hover:border-b-blue-900 hover:text-blue-900',
}

const UserProfile = () => {
  const { id } = useParams()
  const [user, setUser] = useState<IUser>()
  const [comments, setComments] = useState<ICommentMetadata[]>([])
  const [blogs, setBlogs] = useState<IBlogMetadata[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const userStates = useAppSelector((state) => state.user)
  const [searchParam, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  var tab = searchParam.get('tab')
  if (tab == null) {
    searchParam.set('tab', 'blog')
    setSearchParams(searchParam)
  }

  useEffect(() => {
    ApiUser.getUserDetail(id ?? '').then((rs) => {
      setUser(rs.data.data.user)
      setBlogs(rs.data.data.blogs)
      setComments(rs.data.data.comments)
      setIsLoading(false)
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
            <ListUsers Follower={true} />
          </div>
        )
      case 'followed':
        return (
          <div className="flex flex-col space-y-3">
            <ListUsers Followed={true} />
          </div>
        )
      default:
        return (
          <div className="flex flex-col space-y-3">
            <ListBlog AuthorIds={user?.userInfo.id} />
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
        <div
          className={`absolute: ${
            userStates.user?.id == user?.userInfo.id ? 'block' : 'hidden'
          } flex w-full justify-end mb-2`}>
          <button
            onClick={() => {
              navigate('/edit-profile')
            }}
            className="px-3 py-1 bg-blue-800 text-white rounded hover:bg-blue-900">
            Edit
          </button>
        </div>
        <div className="flex flex-col  items-center border-b-2 pb-10 border-gray-300">
          <img
            className="w-32 h-32 rounded-full"
            src={user?.userInfo.avatar}
          />
          <strong className="mt-3 block text-xs text-gray-500 font-medium cursor-pointer hover:text-blue-900">
            @{user?.userInfo.displayName}
          </strong>
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
                {user?.totalViolations} total violated
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
