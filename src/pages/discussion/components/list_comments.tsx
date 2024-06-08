import { useEffect, useState } from 'react'
import { ICommentItem } from '../../../interfaces/model/comment'
import ApiComment from '../../../apis/kang-blogging/comment'
import CommentCard from '../../../components/comment_card'
import { Pagination } from '../../../components/pagination/pagination'

const PAGE_SIZE = 20
const INITIAL_PAGE = 1
export interface Props {
  SearchName?: string | null
  SortBy?: string | null
}

const ListComments = (prop: Props) => {
  const [listComments, setListComments] = useState<ICommentItem[]>([])
  const [page, setPage] = useState(INITIAL_PAGE)
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

  if (isLoading) {
    return <p>Is Loading ...</p>
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
      <div className="flex justify-center">
        <Pagination
          totalItem={totalItems}
          itemPerPage={PAGE_SIZE}
          currentPage={page}
          setCurrentPage={setPage}
        />
      </div>
    </div>
  )
}

export default ListComments