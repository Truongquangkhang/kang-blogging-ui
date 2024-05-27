import { useEffect, useState } from 'react'
import ApiUser from '../../../apis/kang-blogging/user'
import { IUSerMetadata } from '../../../interfaces/model/user_metadata'
import { Pagination } from '../../../components/pagination/pagination'
import UserCard from '../../../components/user_card.ts'

const PAGE_SIZE = 20
const INITIAL_PAGE = 1

export interface Props {
  SearchBy?: string | null
  SearchName?: string | null
}

const ListUsers = (prop: Props) => {
  const [listUsers, setListusers] = useState<IUSerMetadata[]>([])
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
    return <p>Loading...</p>
  }

  return (
    <div>
      <div className="flex-col space-y-3 w-full justify-center border-spacing-20">
        {listUsers.map((user) => {
          return <UserCard user={user} />
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

export default ListUsers
