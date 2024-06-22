import { useEffect, useState } from 'react'
import ApiBlog from '../../../apis/kang-blogging/blog'
import { IBlogMetadata } from '../../../interfaces/model/blog_metadata'
import BlogDetail from '../../../components/blog_detail.ts/blog_detail'
import { Pagination } from '../../../components/pagination/pagination'
import Loader from '../../../common/loader'
import Empty from '../../../common/empty'
import { useSearchParams } from 'react-router-dom'

const PAGE_SIZE = 20

export interface Props {
  // Page: number
  SearchBy?: string | null
  SearchName?: string | null
  CategoryIds?: string
  SortBy?: string | null
  Published?: boolean | null
  AuthorIds?: string | null
  GetRelevant?: boolean | null
}

const ListBlog = (prop: Props) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [listBlogs, setListBlogs] = useState<IBlogMetadata[]>([])
  const [page, setPage] = useState(parseInt(searchParams.get('page') ?? '1', 10))
  const [totalItems, setTotalItems] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    {
      ApiBlog.getBlogs({
        page: page,
        pageSize: PAGE_SIZE,
        authorIds: prop.AuthorIds,
        searchBy: prop.SearchBy,
        searchName: prop.SearchName,
        categoryIds: prop.CategoryIds,
        sortBy: prop.SortBy,
        published: prop.Published,
        isDeprecated: false,
        getRelevant: prop.GetRelevant,
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
        {listBlogs.map((blog) => {
          return (
            <div key={blog.id}>
              <BlogDetail blog={blog} />
            </div>
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

export default ListBlog
