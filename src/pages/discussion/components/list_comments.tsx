import { useEffect, useState } from 'react'
import { ICommentItem } from '../../../interfaces/model/comment'
import ApiComment from '../../../apis/kang-blogging/comment'
import CommentCard from '../../../components/comment_card'
import { Pagination } from '../../../components/pagination/pagination'
import Loader from '../../../common/loader'
import Empty from '../../../common/empty'
import { useSearchParams } from 'react-router-dom'

const PAGE_SIZE = 20
export interface Props {
  SearchName?: string | null
  SortBy?: string | null
  UserIds?: string | null
  IsToxic?: boolean | null
}

const ListComments = (prop: Props) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [listComments, setListComments] = useState<ICommentItem[]>([])
  const [page, setPage] = useState(parseInt(searchParams.get('page') ?? '1', 10))
  const [totalItems, setTotalItems] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    {
      console.log('Call api getBlogs at here')
      ApiComment.getCommentsByParam({
        page: page,
        pageSize: PAGE_SIZE,
        searchName: prop.SearchName,
        sortBy: prop.SortBy,
        userIds: prop.UserIds,
        isToxicity: prop.IsToxic,
      })
        .then((rs) => {
          setListComments(rs.data.data.comments)
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
    <div className="flex flex-col w-full space-y-3">
      {listComments.map((comment) => {
        return (
          <CommentCard
            key={comment.commentInfo.id}
            comment={comment}
          />
        )
      })}
      <div
        className={`${totalItems < PAGE_SIZE ? 'hidden' : 'block'} flex justify-center`}>
        <Pagination
          totalItem={totalItems}
          itemPerPage={PAGE_SIZE}
          currentPage={page}
          setCurrentPage={changePage}
        />
      </div>
    </div>
  )
}

export default ListComments
