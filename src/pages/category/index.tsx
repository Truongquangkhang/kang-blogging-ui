import { useParams, useSearchParams } from 'react-router-dom'
import ListBlog from '../home/components/list_blog'

const Category = () => {
  const { id } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()

  return (
    <div className="flex flex-col p-10 space-y-10 items-center">
      <div
        className={`flex flex-col w-full items-start rounded-md border border-gray-100 bg-white px-4 py-5 shadow-lg`}>
        <div className="flex items-center">
          <span className="radius-default p-2 shrink-0">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="crayons-icon"
              xmlns="http://www.w3.org/2000/svg">
              <path d="M7.784 14l.42-4H4V8h4.415l.525-5h2.011l-.525 5h3.989l.525-5h2.011l-.525 5H20v2h-3.784l-.42 4H20v2h-4.415l-.525 5h-2.011l.525-5H9.585l-.525 5H7.049l.525-5H4v-2h3.784zm2.011 0h3.99l.42-4h-3.99l-.42 4z"></path>
            </svg>
          </span>
          <strong className="ml-2 block text-2xl font-medium cursor-pointer hover:text-blue-900">
            {searchParams.get('n')}
          </strong>
        </div>
        {/* <div
          className={`absolute:${
            searchParams.get('n') != null ? 'block' : 'hidden'
          } flex mt-3 ml-12 items-start`}>
          <RiBook2Fill />
          <strong
            className={`ml-2 block text-xs font-medium cursor-pointer hover:text-blue-900`}>
            {searchParams.get('t')}
          </strong>
        </div> */}
      </div>
      <div className="w-3/4">
        <ListBlog CategoryIds={id} />
      </div>
    </div>
  )
}

export default Category
