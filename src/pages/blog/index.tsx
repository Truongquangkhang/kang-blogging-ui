import { useParams } from 'react-router-dom'
import { BlogContent } from './components/blog_content'
import ApiBlog from '../../apis/kang-blogging/blog'
import { useEffect, useState } from 'react'
import { IBlog } from '../../interfaces/model/blog_info'

const Blog = () => {
  const { id } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [blog, setBlog] = useState<IBlog>()
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
  })

  if (isLoading) {
    return <p>Is Loading</p>
  }
  return (
    <div className="flex space-x-10">
      <div className="w-4/5  bg-white rounded-xl shadow-md overflow-hidden">
        <div className="text-left font-semibold text-xl tracking-tight mb-5">
          <img
            src={blog?.blogInfo.thumbnail}
            style={{ aspectRatio: 'auto 1000 / 200' }}
            width="1000"
            height="200"
            alt={blog?.blogInfo.name}
          />
        </div>
        <div className="flex-col text-left pt-5 pr-20 pl-20 space-y-3">
          <div className="flex space-x-3 items-center">
            <img
              className="w-10 h-10 rounded-full mr-2"
              src={blog?.blogInfo.author.avatar}
            />
            <div className="text-left flex-col justify-center">
              <p className="text-gray-900 leading-none font-semibold text-xs tracking-tigh cursor-pointer hover:text-blue-900">
                {blog?.blogInfo.author.displayName}
              </p>
              <p className="text-sm">{' 3 days ago'}</p>
            </div>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight">
            {blog?.blogInfo.name}
          </h1>
          <div className="flex space-x-2">
            {blog?.blogInfo.categories.map((cate) => {
              return (
                <a
                  key={cate.id}
                  className="bg-blue-100 hover:bg-blue-200 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-white dark:text-blue-400 border border-blue-400 inline-flex items-center justify-center cursor-pointer">
                  {cate.name}
                </a>
              )
            })}
          </div>
        </div>
        <div className="flex-col text-left pt-10 pr-20 pl-20 space-y-5">
          <BlogContent content={blog?.content ?? ''} />
        </div>
      </div>
      <div className="w-1/5  bg-white rounded-xl shadow-md overflow-hidden">
        <div className="text-left font-semibold text-xl tracking-tight mb-5">
          <p>Categories</p>
        </div>
        <div className="justify-start"></div>
      </div>
    </div>
  )
}

export default Blog
