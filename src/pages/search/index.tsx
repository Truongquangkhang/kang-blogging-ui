import { useSearchParams } from 'react-router-dom'
import ListBlog from '../home/components/list_blog'
import ListUsers from './components/list_users'
import ListCategories from './components/list_categories.'
import ListComments from '../discussion/components/list_comments'

const TabNames = ['Blogs', 'Users', 'Categories', 'Discussions']

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const search_name = searchParams.get('q')
  return (
    <div className="flex space-x-10">
      <div className="max-w-screen-md mx-auto w-1/4">
        <div className="bg-white py-2 px-3">
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
      <div className="w-3/4">
        <RenderByTab
          tab={searchParams.get('tab') ?? ''}
          searchName={search_name ?? ''}
        />
      </div>
    </div>
  )
}

interface RenderByTabProps {
  tab: string
  searchName: string
}
const RenderByTab = ({ tab, searchName }: RenderByTabProps) => {
  if (tab == 'Blogs') {
    return (
      <ListBlog
        SearchBy={'title'}
        SearchName={searchName}
      />
    )
  } else if (tab == 'Users') {
    return (
      <ListUsers
        SearchBy={'name'}
        SearchName={searchName}
      />
    )
  } else if (tab == 'Categories') {
    return (
      <ListCategories
        SearchName={searchName}
        SortBy={'blog'}
      />
    )
  } else if (tab == 'Discussions') {
    return (
      <ListComments
        SearchName={searchName}
        SortBy={'created_at'}
      />
    )
  }
  return <></>
}

export default Search
