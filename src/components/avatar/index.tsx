import { useEffect, useRef, useState } from 'react'
import { IUSerMetadata } from '../../interfaces/model/user_metadata'
import { useNavigate } from 'react-router-dom'
import defaultAvatart from '../../assets/default_avatar.jpg'

interface Props {
  user?: IUSerMetadata
}

export const Avatar = ({ user }: Props) => {
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => {
      document.removeEventListener('mousedown', handler)
    }
  }, [])

  return (
    <div>
      <div>
        <img
          id="avatarButton"
          itemType="button"
          data-dropdown-toggle="userDropdown"
          data-dropdown-placement="bottom-start"
          className="w-10 h-10 rounded-full cursor-pointer"
          src={user?.avatar != '' && user?.avatar != null ? user.avatar : defaultAvatart}
          alt="User dropdown"
          onClick={() => {
            setOpen(!open)
          }}
        />
      </div>

      <div
        ref={menuRef}
        className={`absolute ${
          open ? 'block' : 'hidden'
        } right-5 z-10 divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600`}>
        <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
          <div>{user?.name}</div>
          <div className="font-medium truncate">{user?.displayName}</div>
        </div>
        <ul
          className="py-2 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="avatarButton">
          <li>
            <a
              onClick={() => {
                navigate(`/user/${user?.id}`)
              }}
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
              Profile
            </a>
          </li>
          <li>
            <a className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
              Blogs
            </a>
          </li>
          <li>
            <a className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
              Settings
            </a>
          </li>
        </ul>
        <div className="py-1">
          <a
            onClick={() => {
              navigate(`/logout`)
            }}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
            Sign out
          </a>
        </div>
      </div>
    </div>
  )
}
