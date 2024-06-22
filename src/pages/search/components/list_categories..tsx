import { useEffect, useState } from 'react'
import CategoryCard from '../../../components/category_card'
import { ICategory } from '../../../interfaces/model/category'
import ApiCategory from '../../../apis/kang-blogging/category'
import { Pagination } from '../../../components/pagination/pagination'
import Loader from '../../../common/loader'
import Empty from '../../../common/empty'
import { useSearchParams } from 'react-router-dom'

const PAGE_SIZE = 20

export interface Props {
  SearchName?: string | null
  SortBy?: string | null
}

const ListCategories = (prop: Props) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [listCategories, setListCategories] = useState<ICategory[]>([])
  const [page, setPage] = useState(parseInt(searchParams.get('page') ?? '1', 10))
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

  const changePage = (page: number) => {
    searchParams.set('page', page.toString())
    setSearchParams(searchParams)
    setPage(page)
  }

  if (isLoading) {
    return <Loader />
  }
  if (totalItems == 0) {
    return <Empty />
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

        <div
          className={`${
            totalItems < PAGE_SIZE ? 'hidden' : 'block'
          } flex justify-center`}>
          <Pagination
            totalItem={totalItems}
            itemPerPage={PAGE_SIZE}
            currentPage={page}
            setCurrentPage={changePage}
          />
        </div>
      </div>
    </div>
  )
}

export default ListCategories
