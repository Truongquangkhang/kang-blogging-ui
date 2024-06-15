import { RiBook2Line } from 'react-icons/ri'
import { ICategory } from '../../interfaces/model/category'
import { useNavigate } from 'react-router-dom'

interface Props {
  category: ICategory
}

const CategoryCard = ({ category }: Props) => {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col  items-start rounded-md border border-gray-100 bg-white px-4 py-3 shadow-lg">
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
        <strong
          onClick={() => {
            navigate(
              `/category/${category.id}?n=${category.name}&t=${category.blogCount}`,
            )
          }}
          className="ml-2 block text-lg font-medium cursor-pointer hover:text-blue-900">
          {category.name}
        </strong>
      </div>
      <div className="flex mt-1 ml-12 items-start">
        <RiBook2Line />
        <strong className="ml-2 block text-xs font-medium cursor-pointer hover:text-blue-900">
          {category.blogCount}
        </strong>
      </div>
    </div>
  )
}

export default CategoryCard
