import { useEffect, useState } from 'react'
import MDEditor from '@uiw/react-md-editor'
import Multiselect from 'multiselect-react-dropdown'
import '@uiw/react-md-editor/markdown-editor.css'
import '@uiw/react-markdown-preview/markdown.css'
import { ICategory } from '../../interfaces/model/category'
import ApiCategory from '../../apis/kang-blogging/category'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { useNavigate } from 'react-router-dom'
import { setNotify } from '../../redux/reducers/notify'
import ApiBlog from '../../apis/kang-blogging/blog'
import { MapErrorResponse } from '../../utils/map_data_response'
import ImageUploader from '../../components/upload_image'

const CreateBlog = () => {
  const [imageSrc, setImageSrc] = useState('')
  const [value, setValue] = useState('**Hello world!!!**')
  const [title, setTitle] = useState('')
  const [categories, setCategories] = useState<ICategory[]>([])
  const [selectedCategories, setSelectedCategories] = useState<ICategory[]>([])
  const authStates = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleCreateBlog = () => {
    if (title != '' && selectedCategories.length > 0) {
      ApiBlog.createBlog(
        {
          name: title,
          description: title,
          category_ids: selectedCategories.map((cate) => cate.id),
          content: value,
          thumbnail: imageSrc,
        },
        authStates.accessToken ?? '',
      )
        .then((rs) => {
          navigate('/')
        })
        .catch((err) => {
          console.error(err)
          var e = MapErrorResponse(err)
          setNotify({
            title: 'occurred an error !!!',
            description: e.message,
            mustShow: true,
          })
        })
    }
  }
  useEffect(() => {
    ApiCategory.getCategories({ page: 1, pageSize: 100, sortBy: 'blog' })
      .then((rs) => {
        setCategories(rs.data.data.categories)
      })
      .catch((err) => {
        console.error(err)
        dispatch(
          setNotify({ title: 'occurred an error !!!', description: err, mustShow: true }),
        )
      })
  }, [])

  if (!authStates.isLogin) {
    dispatch(setNotify({ title: 'Please login !!!', description: '', mustShow: true }))
    navigate('/login')
  }
  return (
    <div className="max-h-screen">
      <h1 className="text-2xl font-bold">Create blog</h1>
      <div className="mt-10 flex flex-col space-y-5">
        <div>
          <ImageUploader
            imageSrc={imageSrc}
            setImageSrc={setImageSrc}
          />
        </div>
        <div>
          <input
            value={title}
            onChange={(e) => {
              setTitle(e.target.value)
            }}
            className="w-full text-4xl font-extrabold  leading-tight focus:outline-none focus:shadow-outline"
            placeholder="New title here..."
          />
        </div>
        <div>
          <Multiselect
            placeholder="add..."
            options={categories}
            onSelect={(cate) => {
              setSelectedCategories(cate)
            }}
            onRemove={(cate) => {
              setSelectedCategories(cate)
            }}
            displayValue="name"
          />
        </div>
        <div data-color-mode="light">
          <MDEditor
            value={value}
            onChange={(e) => {
              setValue(e?.toString() ?? '')
            }}
          />
        </div>
        <div>
          <button
            type="button"
            onClick={() => {
              console.log(selectedCategories)
              handleCreateBlog()
            }}
            className="py-2.5 px-4 w-1/4 mr-2 text-xs font-medium bg-blue-500 text-white rounded-lg focus:ring-4 focus:ring-primary-200 hover:bg-blue-900">
            Save
          </button>
          <button
            type="button"
            className="w-1/4 items-center ml-2 py-2.5 px-4 text-xs font-medium text-center bg-gray-300 rounded-lg focus:ring-4 focus:ring-primary-200 hover:bg-gray-400">
            Dismiss
          </button>
        </div>
      </div>
    </div>
  )
}

export default CreateBlog
