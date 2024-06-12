import { useEffect, useState } from 'react'
import ApiBlog from '../../../apis/kang-blogging/blog'
import { IBlogMetadata } from '../../../interfaces/model/blog_metadata'
import BlogDetail from '../../../components/blog_detail.ts/blog_detail'
import { Pagination } from '../../../components/pagination/pagination'
import Loader from '../../../common/loader'

const PAGE_SIZE = 20
const INITIAL_PAGE = 1

export interface Props {
  SearchBy?: string | null
  SearchName?: string | null
  CategoryIds?: string
  SortBy?: string | null
}

const ListBlog = (prop: Props) => {
  const [listBlogs, setListBlogs] = useState<IBlogMetadata[]>([])
  const [page, setPage] = useState(INITIAL_PAGE)
  const [totalItems, setTotalItems] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    {
      console.log('Call api getBlogs at here')
      ApiBlog.getBlogs({
        page: page,
        pageSize: PAGE_SIZE,
        searchBy: prop.SearchBy,
        searchName: prop.SearchName,
        categoryIds: prop.CategoryIds,
        sortBy: prop.SortBy,
        published: true,
        isDeprecated: false,
      })
        .then((rs) => {
          setListBlogs(rs.data.data.blogs)
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
    return <Loader />
  }
  return (
    <div>
      <div className="flex-col space-y-3 w-full justify-center border-spacing-20">
        {listBlogs.map((blog) => {
          return (
            <div key={blog.id}>
              <BlogDetail blog={blog} />
            </div>
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

export default ListBlog
