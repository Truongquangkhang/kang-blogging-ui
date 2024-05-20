import { useEffect, useState } from 'react'
import { BlogComment } from '../../../components/comment/blog_comment'
import ApiComment from '../../../apis/kang-blogging/comment'
import { ICommentWithReplies } from '../../../interfaces/model/comment'

interface Props {
  blogID: string
}

const PAGE_SIZE = 20

export const ListComment = ({ blogID }: Props) => {
  const [isLoading, setIsLoading] = useState(true)
  const [comments, setComments] = useState<ICommentWithReplies[]>([])
  const fetchBlogCommentsById = (id: string) => {
    ApiComment.getBlogComments({ page: 1, pageSize: PAGE_SIZE, blog_id: id })
      .then((rs) => {
        setComments(rs.data.data.comments)
        setIsLoading(false)
      })
      .catch((err) => {
        setIsLoading(false)
        console.error(err)
      })
  }
  useEffect(() => {
    fetchBlogCommentsById(blogID)
  }, [blogID])
  if (isLoading) {
    return <p>Is Loading</p>
  }
  return (
    <section className="bg-white py-8 lg:py-16 antialiased pr-20 pl-20">
      <div className="px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg lg:text-2xl font-bold text-gray-900 ">
            Discussion (20)
          </h2>
        </div>
        <form className="mb-6">
          <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200">
            <label className="sr-only">Your comment</label>
            <textarea
              id="comment"
              rows={6}
              className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none"
              placeholder="Write a comment..."
              required></textarea>
          </div>
          <button
            type="submit"
            className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 hover:bg-primary-800">
            Post comment
          </button>
        </form>
        {comments.map((comment) => {
          return (
            <BlogComment
              key={comment.comment.id}
              comment={comment}
            />
          )
        })}
      </div>
    </section>
  )
}
