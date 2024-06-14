import { useEffect, useState } from 'react'
import ApiUser from '../../../apis/kang-blogging/user'
import { Pagination } from '../../../components/pagination/pagination'
import UserCard from '../../../components/user_card.ts'
import Loader from '../../../common/loader/index.tsx'
import { IUser } from '../../../interfaces/model/user.ts'
import Empty from '../../../common/empty/index.tsx'

const PAGE_SIZE = 20
const INITIAL_PAGE = 1

export interface Props {
  SearchBy?: string | null
  SearchName?: string | null
  FollowerId?: string | null
  FollowedId?: string | null
  SortBy?: string | null
}

const ListUsers = (prop: Props) => {
  const [listUsers, setListusers] = useState<IUser[]>([])
  const [page, setPage] = useState(INITIAL_PAGE)
  const [totalItems, setTotalItems] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    {
      console.log('Call api getBlogs at here')
      ApiUser.getUsers({
        page: page,
        pageSize: PAGE_SIZE,
        searchBy: prop.SearchBy,
        searchName: prop.SearchName,
        followedId: prop.FollowedId,
        followerId: prop.FollowerId,
        sortBy: prop.SortBy,
      })
        .then((rs) => {
          setListusers(rs.data.data.users)
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

  if (totalItems == 0) {
    return <Empty />
  }

  return (
    <div>
      <div className="flex-col space-y-3 w-full justify-center border-spacing-20">
        {listUsers.map((user) => {
          return <UserCard user={user} />
        })}

        <div
          className={`${
            totalItems < PAGE_SIZE ? 'hidden' : 'block'
          } flex justify-center`}>
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

export default ListUsers
