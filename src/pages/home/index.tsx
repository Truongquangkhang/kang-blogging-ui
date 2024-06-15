import { useSearchParams } from 'react-router-dom'
import ListBlog from './components/list_blog'
import { ListCategory } from './components/list_category'
import { useState } from 'react'

const TypeTab = {
  ['selected']:
    ' cursor-pointer whitespace-nowrap inline-flex rounded-lg bg-gray-200 py-2 px-3 text-sm font-medium text-gray-900 transition-all duration-200 ease-in-out',
  ['unselect']:
    ' cursor-pointer whitespace-nowrap inline-flex rounded-lg py-2 px-3 text-sm font-medium text-gray-600 transition-all duration-200 ease-in-out hover:bg-gray-200 hover:text-gray-900',
}

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [paramsGetBlogs, setParamsGetBlogs] = useState({
    sortBy: 'updated_at',
  })
  var tab = searchParams.get('blog_tab')
  if (tab == null) {
    searchParams.set('blog_tab', 'newest')
    setSearchParams(searchParams)
  }

  return (
    <div className="flex space-x-3">
      <div className="w-3/5">
        <div className="w-full flex justify-between text-left font-semibold text-xl tracking-tight mb-5">
          <p>Blogs</p>
          <nav className="flex flex-wrap space-x-3 mr-5">
            <a
              onClick={() => {
                searchParams.set('blog_tab', 'newest')
                setSearchParams(searchParams)
                paramsGetBlogs.sortBy = 'updated_at'
                setParamsGetBlogs(paramsGetBlogs)
              }}
              className={
                tab == 'newest' || tab == null ? TypeTab['selected'] : TypeTab['unselect']
              }>
              {' '}
              Newest{' '}
            </a>
            <a
              onClick={() => {
                searchParams.set('blog_tab', 'top')
                setSearchParams(searchParams)
                paramsGetBlogs.sortBy = 'total_comment'
                setParamsGetBlogs(paramsGetBlogs)
              }}
              className={tab == 'top' ? TypeTab['selected'] : TypeTab['unselect']}>
              {' '}
              Top{' '}
            </a>
            <a
              onClick={() => {
                searchParams.set('blog_tab', 'relevant')
                setSearchParams(searchParams)
              }}
              className={tab == 'relevant' ? TypeTab['selected'] : TypeTab['unselect']}>
              {' '}
              Relevant{' '}
            </a>
          </nav>
        </div>
        <ListBlog
          Published={true}
          SortBy={paramsGetBlogs.sortBy}
          GetRelevant={tab == 'relevant' ? true : null}
        />
      </div>
      <div className="w-2/5">
        <div className="text-left font-semibold text-xl tracking-tight mb-5">
          <p>Categories</p>
        </div>
        <div className="justify-start">
          <ListCategory SortBy={'total_blog'} />
        </div>
      </div>
    </div>
  )
}

export default Home
