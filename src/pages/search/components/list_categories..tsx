import { useEffect, useState } from 'react'
import CategoryCard from '../../../components/category_card'
import { ICategory } from '../../../interfaces/model/category'
import ApiCategory from '../../../apis/kang-blogging/category'
import { Pagination } from '../../../components/pagination/pagination'

const PAGE_SIZE = 20
const INITIAL_PAGE = 1

export interface Props {
  SearchName?: string | null
  SortBy?: string | null
}

const ListCategories = (prop: Props) => {
  const [listCategories, setListCategories] = useState<ICategory[]>([])
  const [page, setPage] = useState(INITIAL_PAGE)
  const [totalItems, setTotalItems] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    {
      console.log('Call api getBlogs at here')
      ApiCategory.getCategories({
        page: page,
        pageSize: PAGE_SIZE,
        searchName: prop.SearchName,
        sortBy: prop.SortBy,
      })
        .then((rs) => {
          setListCategories(rs.data.data.categories)
          setPage(rs.data.data.pagination.page)
          setTotalItems(rs.data.data.pagination.total)
          setIsLoading(false)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [page, prop])
  if (isLoading) {
    return <p>Loading...</p>
  }
  return (
    <div>
      <div className="flex-col space-y-3 w-full justify-center border-spacing-20">
        {listCategories.map((cate) => {
          return (
            <CategoryCard
              category={cate}
              key={cate.id}
            />
          )
        })}

        <div className="flex justify-center">
          <Pagination
            totalItem={totalItems}
            itemPerPage={PAGE_SIZE}
            currentPage={page}
            setCurrentPage={setPage}
          />
        </div>
      </div>
    </div>
  )
}

export default ListCategories
