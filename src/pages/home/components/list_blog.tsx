import { useEffect, useState } from 'react'
import ApiBlog from '../../../apis/kang-blogging/blog'
import { IBlogMetadata } from '../../../interfaces/model/blog_metadata'
import BlogDetail from '../../../components/blog_detail.ts/blog_detail'
interface Prods {
  listBlogs: string
}

const ListBlog = () => {
  const [listBlogs, setListBlogs] = useState<IBlogMetadata[]>([])

  useEffect(() => {
    if (listBlogs.length == 0) {
      console.log('HELLO')
      ApiBlog.getBlogs({ page: 2, pageSize: 10 })
        .then((rs) => {
          setListBlogs(rs.data.data.blogs)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [])

  return (
    <div>
      <div className="flex-col space-y-3 w-full justify-center border-spacing-20">
        {listBlogs.map((blog) => {
          return (
            <div key={blog.id}>
              <BlogDetail blog={blog} />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ListBlog
