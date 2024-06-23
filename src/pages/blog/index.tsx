import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { BlogContent } from './components/blog_content'
import ApiBlog from '../../apis/kang-blogging/blog'
import { useEffect, useState } from 'react'
import { IBlog } from '../../interfaces/model/blog_info'
import { ListComment } from './components/list_comment'
import { CardProfile } from './components/card_profile'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { Category } from '../../components/category/category'
import { setNotify } from '../../redux/reducers/notify'
import { MapErrorResponse } from '../../utils/map_data_response'
import ThumbnailBlog from '../../assets/thumbnail_blog.webp'
import Loader from '../../common/loader'

const Blog = () => {
  const { id } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [blog, setBlog] = useState<IBlog>()
  const navigate = useNavigate()
  const authStates = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()
  const [searchParams] = useSearchParams()
  const handlerClickPublished = (published: boolean) => {
    if (blog?.blogInfo.id != undefined && authStates.accessToken != undefined) {
      ApiBlog.updateBlog(blog?.blogInfo.id, authStates.accessToken, {
        published: published,
      })
        .then((rs) => {
          setBlog(rs.data.data.blog)
        })
        .catch((err) => {
          const e = MapErrorResponse(err)
          dispatch(
            setNotify({
              title: 'Occurred an error',
              description: e.message,
              mustShow: true,
            }),
          )
        })
    }
  }

  const fetchBlogByID = (id: string) => {
    ApiBlog.getBlogById(id)
      .then((rs) => {
        setBlog(rs.data.data.blog)
        setIsLoading(false)
      })
      .catch((err) => {
        console.error(err)
        setIsLoading(false)
      })
  }
  useEffect(() => {
    if (id != null) {
      fetchBlogByID(id)
    }
  }, [id])

  if (isLoading) {
    return <Loader />
  }
  return (
    <div className="flex space-x-5 pb-5">
      <div className="w-3/4 bg-white rounded-xl shadow-md overflow-hidden pb-2">
        <div className="text-left font-semibold text-xl tracking-tight mb-5">
          <img
            src={
              blog?.blogInfo.thumbnail == '' ? ThumbnailBlog : blog?.blogInfo.thumbnail
            }
            style={{ aspectRatio: '1000 / 420' }}
            className="w-full"
            alt={blog?.blogInfo.name}
          />
        </div>
        <div className="flex-col text-left pt-5 pr-20 pl-20 space-y-3">
          <div className="flex w-full justify-between mb-5">
            <div className="flex space-x-3 items-center">
              <img
                className="w-10 h-10 rounded-full mr-2"
                src={blog?.blogInfo.author.avatar}
              />
              <div className="text-left flex-col justify-center">
                <p
                  onClick={() => {
                    navigate(`/user/${blog?.blogInfo.author.id}`)
                  }}
                  className="text-gray-900 leading-none font-semibold text-xs tracking-tigh cursor-pointer hover:text-blue-900">
                  {blog?.blogInfo.author.displayName}
                </p>
                <p className="text-sm">{' 3 days ago'}</p>
              </div>
            </div>
            <div className={`flex absolute: ${blog?.canEdit ? 'block' : 'hidden'}`}>
              <button
                onClick={() => [navigate(`/blog/${id}/edit`)]}
                type="button"
                className="py-2.5 px-4 mr-2 text-xs font-medium border border-gray-300 rounded-lg  hover:bg-gray-200">
                Edit
              </button>
              <div>
                {blog?.blogInfo.published ? (
                  <button
                    onClick={() => {
                      handlerClickPublished(!blog?.blogInfo.published)
                    }}
                    type="button"
                    className="py-2.5 px-4 text-xs font-medium border border-gray-300 rounded-lg  hover:bg-gray-200">
                    Mark Draft
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      handlerClickPublished(!blog?.blogInfo.published)
                    }}
                    type="button"
                    className="py-2.5 px-4 text-xs font-medium border border-gray-300 rounded-lg  hover:bg-gray-200">
                    Publish
                  </button>
                )}
              </div>
            </div>
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight">
            {blog?.blogInfo.name}
          </h1>
          <div className="flex space-x-2">
            {blog?.blogInfo.categories.map((cate) => {
              return (
                // <a
                //   key={cate.id}
                //   className="bg-blue-100 hover:bg-blue-200 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-white dark:text-blue-400 border border-blue-400 inline-flex items-center justify-center cursor-pointer">
                //   {cate.name}
                // </a>
                <Category
                  key={cate.id}
                  category={cate}
                />
              )
            })}
          </div>
        </div>
        <div className="flex-col text-left pt-10 pr-20 pl-20 space-y-5">
          <BlogContent content={blog?.content ?? ''} />
        </div>
        <div>
          <ListComment
            blogID={id ?? ''}
            redirectToComment={searchParams.get('comment')}
          />
        </div>
      </div>
      <div className="w-1/4">
        <CardProfile user_id={blog?.blogInfo.author.id ?? ''} />
      </div>
    </div>
  )
}

export default Blog
