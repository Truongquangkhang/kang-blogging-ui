import { useEffect, useState } from 'react'
import { Category } from '../../../components/category/category'
import { ICategory } from '../../../interfaces/model/category'
import ApiCategory from '../../../apis/kang-blogging/category'
import Loader from '../../../common/loader'

const PAGE_SIZE = 50

export const ListCategory = () => {
  const [listCategory, setListCategory] = useState<ICategory[]>([])
  const [page, setPage] = useState(1)
  const [totalItems, setTotalItems] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  const fetchCategories = (pageNum: number) => {
    ApiCategory.getCategories({ page: pageNum, pageSize: PAGE_SIZE, sortBy: 'blog' })
      .then((rs) => {
        setListCategory((prevCategories) => [
          ...prevCategories,
          ...rs.data.data.categories,
        ])
        setPage(rs.data.data.pagination.page)
        setTotalItems(rs.data.data.pagination.total)
        setIsLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setIsLoading(false)
      })
  }

  const handlerShowLess = () => {
    setListCategory(listCategory.slice(0, PAGE_SIZE))
  }

  useEffect(() => {
    fetchCategories(page)
  }, [page])

  if (isLoading) {
    return <Loader />
  }

  return (
    <div className="flex flex-wrap space-x-0">
      {listCategory.map((cate) => (
        <div key={cate.id}>
          <Category category={cate} />
        </div>
      ))}
      <div
        className={`absolute: ${
          page > 1 ? 'block' : 'hidden'
        } text-xs text-blue-400 text-center hover:text-blue-800 mt-1 cursor-pointer ml-2 mr-2`}
        onClick={() => {
          handlerShowLess()
        }}>
        show less ...
      </div>
      <div
        className={`absolute: ${
          totalItems >= page * PAGE_SIZE ? 'block' : 'hidden'
        } text-xs text-blue-400 text-center hover:text-blue-800 mt-1 cursor-pointer ml-2 mr-2`}
        onClick={() => {
          setPage(page + 1)
        }}>
        show more ...
      </div>
    </div>
  )
}
