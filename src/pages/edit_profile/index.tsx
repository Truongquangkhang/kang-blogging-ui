import { useSearchParams } from 'react-router-dom'
import EditProfile from './components/edit_profile'
import EditAccount from './components/edit_account'

const TabNames = ['Profile', 'Account']
const EditUser = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const tab = searchParams.get('tab')
  if (tab == null) {
    searchParams.set('tab', 'Profile')
    setSearchParams(searchParams)
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
                    <a className="cursor-pointer inline-flex whitespace-nowrap border-b-2 border-transparent border-b-blue-900 py-2 px-3 text-sm font-semibold text-blue-900 transition-all duration-200 ease-in-out">
                      {' '}
                      {tab}{' '}
                    </a>
                  )
                } else {
                  return (
                    <a
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

const RenderByTab = (tab: string) => {
  if (tab == 'Account') {
    return <EditAccount />
  }
  return <EditProfile />
}

export default EditUser
