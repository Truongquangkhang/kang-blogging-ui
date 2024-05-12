import { IUSerMetadata } from '../../interfaces/model/user_metadata'
import { Avatar } from '../avatar'

interface Props {
  isLogin: boolean
  user?: IUSerMetadata
}

const Header = ({ isLogin, user }: Props) => {
  console.log(user)
  return (
    <nav className="flex items-center justify-around bg-blue-900 p-4">
      <div className="flex items-center flex-shrink-0 text-white mr-6 ml-4">
        <svg
          className="fill-current h-8 w-8 mr-2"
          width="54"
          height="54"
          viewBox="0 0 54 54"
          xmlns="http://www.w3.org/2000/svg">
          <path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z" />
        </svg>
        <span className="font-semibold text-xl tracking-tight hover:text-teal-400">
          Kang-Blogging
        </span>
        <div className="ml-8 w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <div className="text-sm lg:flex-grow">
            <a
              href="/"
              className="block mt-2 lg:inline-block lg:mt-0 text-white hover:text-teal-400 mr-4">
              Home
            </a>
            <a
              href="#responsive-header"
              className="block mt-2 lg:inline-block lg:mt-0 text-white hover:text-teal-400 mr-4">
              Discusstion
            </a>
            <a
              href="#responsive-header"
              className="block mt-2 lg:inline-block lg:mt-0 text-white hover:text-teal-400">
              Blog
            </a>
          </div>
        </div>
      </div>
      <div className="w-full block flex-grow lg:flex justify-end lg:items-center lg:w-auto">
        <div>{renderComponentAvatar(isLogin, user)}</div>
      </div>
    </nav>
  )
}

const renderComponentAvatar = (isLogin: boolean, user: IUSerMetadata | undefined) => {
  if (!isLogin && user == null) {
    return (
      <div className="mr-2">
        <a
          href="#"
          className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-blue-900 hover:bg-white mt-4 lg:mt-0 mr-2">
          Sign Up
        </a>
        <a
          href="/login"
          className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-blue-900 hover:bg-white mt-4 lg:mt-0">
          Sign In
        </a>
      </div>
    )
  } else {
    return (
      <div className="mr-4 justify-end  cursor-pointer">
        <Avatar user={user} />
      </div>
    )
  }
}

export default Header
