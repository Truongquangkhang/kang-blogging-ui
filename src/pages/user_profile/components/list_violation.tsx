import { useEffect, useState } from 'react'
import { Pagination } from '../../../components/pagination/pagination'
import Loader from '../../../common/loader'
import Empty from '../../../common/empty'
import { useSearchParams } from 'react-router-dom'
import { IViolation } from '../../../interfaces/model/violation'
import ApiViolation from '../../../apis/kang-blogging/violation'
import ViolationCard from '../../../components/violation_card'

const PAGE_SIZE = 100

export interface Props {
  UserIDs?: string | null
}

const ListViolations = (prop: Props) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [listViolations, setListViolation] = useState<IViolation[]>([])
  const [page, setPage] = useState(parseInt(searchParams.get('page') ?? '1', 10))
  const [totalItems, setTotalItems] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    {
      ApiViolation.getViolations({
        page: page,
        pageSize: PAGE_SIZE,
        user_ids: prop.UserIDs,
      })
        .then((rs) => {
          setListViolation(rs.data.data.violations)
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
        {listViolations.map((violation) => {
          return (
            <ViolationCard
              key={violation.id}
              violation={violation}
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

export default ListViolations
