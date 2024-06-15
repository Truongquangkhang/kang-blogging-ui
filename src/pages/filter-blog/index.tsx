import { useEffect, useState } from 'react'
import ListBlog, { Props } from '../home/components/list_blog'
import ApiCategory from '../../apis/kang-blogging/category'
import { ICategory } from '../../interfaces/model/category'
import MultipleSelectCheckmarks from './multi_select'

interface FilterBlogsProps {
  selectCate?: ICategory
}
const FilterBlogs = ({ selectCate }: FilterBlogsProps) => {
  const [filter, setFilter] = useState<Props>({ CategoryIds: selectCate?.id })
  const [categories, setCategories] = useState<ICategory[]>([])
  useEffect(() => {
    ApiCategory.getCategories({ page: 1, pageSize: 100, sortBy: 'total_blog' })
      .then((rs) => {
        setCategories(rs.data.data.categories)
      })
      .catch((err) => {
        console.error(err)
      })
  }, [])

  const handleFilter = (searchByName?: string, categoryIds?: string, sortBy?: string) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      SearchName: searchByName ?? prevFilter?.SearchName,
      CategoryIds: categoryIds ?? prevFilter?.CategoryIds,
      SortBy: sortBy ?? prevFilter?.SortBy,
    }))
  }
  return (
    <div className="flex flex-col items-center w-full">
      <Filter
        callBackFilter={handleFilter}
        categories={categories}
      />

      <div className="w-2/3">
        <ListBlog
          SortBy={filter?.SortBy}
          CategoryIds={filter?.CategoryIds}
          Published={true}
          SearchBy={'title'}
          SearchName={filter?.SearchName}
        />
      </div>
    </div>
  )
}

interface FilterProps {
  callBackFilter: any
  categories: ICategory[]
}
const Filter = ({ callBackFilter, categories }: FilterProps) => {
  const [sortBy, setSortBy] = useState('updated_at')
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>([])
  const [searchName, setSearchName] = useState('')
  return (
    <div className="flex w-full mt-10 mb-10 justify-center space-x-5">
      <div className="flex flex-col">
        <label className="text-sm font-medium text-stone-600">Search By Name</label>
        <input
          value={searchName}
          onChange={(e) => {
            setSearchName(e.target.value)
          }}
          type="text"
          id="name"
          placeholder="search by title blog"
          className="mt-2 block w-full h-full rounded-md border px-2 py-2 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        />
      </div>
      <div className="flex flex-col">
        <label className="text-sm font-medium text-stone-600">Order By</label>

        <select
          onChange={(e) => {
            setSortBy(e.target.value)
          }}
          className="mt-2 block w-full h-full rounded-md bg-white border px-2 py-2 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
          <option
            selected
            value={'updated_at'}>
            Update At
          </option>
          <option value={'total_comment'}>Total Comment</option>
        </select>
      </div>
      <div className="flex flex-col items-center space-y-2 ">
        <label className="text-sm font-medium text-stone-600">Categories</label>
        <div className="items-center">
          <MultipleSelectCheckmarks
            categories={categories}
            selectedCategoryIds={selectedCategoryIds}
            setSelectedCategoryIds={setSelectedCategoryIds}
          />
        </div>
      </div>
      <div className="flex flex-col justify-start">
        <button
          type="button"
          onClick={() => {
            callBackFilter(searchName, selectedCategoryIds.join(', '), sortBy)
          }}
          className="mt-6 rounded-lg h-full bg-blue-900 px-8 py-2 font-medium text-white outline-none hover:opacity-80 focus:ring">
          Apply
        </button>
      </div>
    </div>
  )
}

export default FilterBlogs
