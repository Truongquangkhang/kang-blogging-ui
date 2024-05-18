import { useState } from 'react'

const LIMIT_PAGE = 7

interface PaginationProps {
  itemPerPage: number
  totalItem: number
  currentPage: number
  setCurrentPage: any
}

interface Page {
  number: number
  isMorePage: boolean
  isCurrentPage: boolean
}

const SetPaginationNumbers = (
  totalItem: number,
  itemPerPage: number,
  currentPage: number,
) => {
  console.log('call here ')
  const totalPage = Math.ceil(totalItem / itemPerPage)
  var paginationNumbers: Page[] = []
  if (totalPage >= LIMIT_PAGE) {
    // init pages
    paginationNumbers.push({
      number: 1,
      isCurrentPage: currentPage == 1,
      isMorePage: false,
    })
    var start = currentPage - 3 > 1 ? currentPage - 3 : 2
    var end = currentPage + 3 < totalPage ? currentPage + 3 : totalPage - 1
    for (let i = start; i <= end; i++) {
      paginationNumbers.push({
        number: i,
        isCurrentPage: currentPage == i,
        isMorePage: false,
      })
    }
    paginationNumbers.push({
      number: totalPage,
      isCurrentPage: currentPage == totalPage,
      isMorePage: false,
    })

    var len = paginationNumbers.length
    // check current page
    if (currentPage <= 4) {
      paginationNumbers.splice(len - 1, 0, {
        number: 0,
        isCurrentPage: false,
        isMorePage: true,
      })
    } else if (currentPage > 4 && totalPage - currentPage > 4) {
      paginationNumbers.splice(1, 0, {
        number: 0,
        isCurrentPage: false,
        isMorePage: true,
      })
      paginationNumbers.splice(len, 0, {
        number: 0,
        isCurrentPage: false,
        isMorePage: true,
      })
    } else if (currentPage > 4 && totalPage - currentPage <= 4) {
      paginationNumbers.splice(1, 0, {
        number: 0,
        isCurrentPage: false,
        isMorePage: true,
      })
    }
  } else {
    for (let i = 1; i <= totalPage; i++) {
      paginationNumbers.push({
        number: i,
        isMorePage: false,
        isCurrentPage: i == currentPage,
      })
    }
  }
  return paginationNumbers
}

export const Pagination = ({
  itemPerPage,
  totalItem,
  currentPage,
  setCurrentPage,
}: PaginationProps) => {
  const paginationNumbers = SetPaginationNumbers(totalItem, itemPerPage, currentPage)

  const handlerChangePage = (page: number) => {
    setCurrentPage(page)
    console.log('handler')
  }

  return (
    <>
      <nav aria-label="Page navigation example">
        <ul className="flex items-center -space-x-px h-10 text-base">
          <li>
            <a
              className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100"
              onClick={() => {
                if (currentPage > 1) {
                  handlerChangePage(currentPage - 1)
                }
              }}>
              <span className="sr-only">Previous</span>
              <svg
                className="w-3 h-3 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10">
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 1 1 5l4 4"
                />
              </svg>
            </a>
          </li>

          {paginationNumbers.map((page, index) => {
            return (
              <PaginationItem
                key={index}
                page={page}
                handleChangePage={handlerChangePage}
              />
            )
          })}
          <li>
            <a
              className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700"
              onClick={() => {
                if (currentPage < Math.ceil(totalItem / itemPerPage)) {
                  handlerChangePage(currentPage + 1)
                }
              }}>
              <span className="sr-only">Next</span>
              <svg
                className="w-3 h-3 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10">
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
            </a>
          </li>
        </ul>
      </nav>
    </>
  )
}

interface PaginationItemProps {
  page: Page
  handleChangePage: any
}

const PaginationItem = ({ page, handleChangePage }: PaginationItemProps) => {
  if (page.isCurrentPage) {
    return (
      <li>
        <a
          aria-current="page"
          className="z-10 flex items-center justify-center px-4 h-10 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700">
          {page.number}
        </a>
      </li>
    )
  } else if (page.isMorePage) {
    return (
      <li>
        <a className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300  hover:bg-gray-100">
          <span className="sr-only">...</span>
          <svg
            className="w-3 h-3 "
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <text
              x="50%"
              y="50%"
              dominantBaseline="middle"
              textAnchor="middle"
              fontSize="16"
              fill="currentColor">
              ...
            </text>
          </svg>
        </a>
      </li>
    )
  }
  return (
    <li>
      <a
        className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
        onClick={() => {
          handleChangePage(page.number)
        }}>
        {page.number}
      </a>
    </li>
  )
}
