import { useSearchParams } from 'react-router-dom'
import ListBlog from '../home/components/list_blog'
import ListUsers from './components/list_users'
import ListCategories from './components/list_categories.'
import ListComments from '../discussion/components/list_comments'

const TabNames = ['Blogs', 'Users', 'Categories', 'Discussions']
const TypeTab = {
  ['selected']:
    ' cursor-pointer whitespace-nowrap inline-flex rounded-lg bg-gray-200 py-2 px-3 text-sm font-medium text-gray-900 transition-all duration-200 ease-in-out',
  ['unselect']:
    ' cursor-pointer whitespace-nowrap inline-flex rounded-lg py-2 px-3 text-sm font-medium text-gray-600 transition-all duration-200 ease-in-out hover:bg-gray-200 hover:text-gray-900',
}

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const search_name = searchParams.get('q')?.toString().trim()
  var sort_by = searchParams.get('sort_by')?.toString().trim()
  if (sort_by == null) {
    searchParams.set('sort_by', 'newest')
    setSearchParams(searchParams)
  }
  return (
    <div className="flex-col p-10">
      <div className="flex justify-between p-3">
        <p className="text-3xl font-bold">Search results for {search_name}</p>
        <nav className="flex flex-wrap space-x-3 mr-5">
          <a
            onClick={() => {
              searchParams.set('sort_by', 'newest')
              setSearchParams(searchParams)
            }}
            className={
              sort_by == 'newest' || sort_by == null
                ? TypeTab['selected']
                : TypeTab['unselect']
            }>
            {' '}
            Newest{' '}
          </a>
          <a
            onClick={() => {
              searchParams.set('sort_by', 'top')
              setSearchParams(searchParams)
            }}
            className={sort_by == 'top' ? TypeTab['selected'] : TypeTab['unselect']}>
            {' '}
            Top{' '}
          </a>
        </nav>
      </div>

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
            sortBy={sort_by ?? 'updated_at'}
          />
        </div>
      </div>
    </div>
  )
}

interface RenderByTabProps {
  tab: string
  searchName: string
  sortBy: string
}
const RenderByTab = ({ tab, searchName, sortBy }: RenderByTabProps) => {
  if (tab == 'Blogs') {
    return (
      <ListBlog
        SearchBy={'title'}
        Published={true}
        SearchName={searchName}
        SortBy={sortBy != 'newest' ? 'total_comment' : 'updated_at'}
      />
    )
  } else if (tab == 'Users') {
    return (
      <ListUsers
        SearchBy={'name'}
        SearchName={searchName}
        SortBy={sortBy != 'newest' ? 'total_follower' : 'created_at'}
      />
    )
  } else if (tab == 'Categories') {
    return (
      <ListCategories
        SearchName={searchName}
        SortBy={sortBy != 'newest' ? 'total_blog' : 'created_at'}
      />
    )
  } else if (tab == 'Discussions') {
    return (
      <ListComments
        IsToxic={false}
        SearchName={searchName}
        SortBy={sortBy != 'newest' ? 'total_reply' : 'created_at'}
      />
    )
  }
  return <></>
}

export default Search
