import { useEffect, useRef, useState } from 'react'
import { BlogComment } from '../../../components/comment/blog_comment'
import ApiComment from '../../../apis/kang-blogging/comment'
import { IComment, ICommentWithReplies } from '../../../interfaces/model/comment'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import { setNotify } from '../../../redux/reducers/notify'
import { CreateBlogCommentRequest } from '../../../interfaces/request/comment_request'
import Loader from '../../../common/loader'
import { MapErrorResponse } from '../../../utils/map_data_response'
import { AxiosError } from 'axios'
import CommentBox from '../../../components/comment_box'

interface Props {
  blogID: string
  redirectToComment?: string | null
}

const PAGE_SIZE = 20

export const ListComment = ({ blogID, redirectToComment }: Props) => {
  const [isLoading, setIsLoading] = useState(true)
  const [comments, setComments] = useState<ICommentWithReplies[]>([])
  const [yourComment, setYourComment] = useState('')
  const authStates = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()
  const commentRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})

  const handleClickSubmitComment = () => {
    if (yourComment != '') {
      createBlogComment({ content: yourComment })
      setYourComment('')
    }
  }

  const handleClickDismiss = () => {
    setYourComment('')
  }

  const createBlogComment = ({ content, reply_comment_id }: CreateBlogCommentRequest) => {
    if (!authStates.isLogin) {
      dispatch(
        setNotify({
          title: 'Please Login !!!',
          description: 'your need login to comment this blog',
          mustShow: true,
        }),
      )
    } else {
      ApiComment.createBlogComment(
        { content: content, reply_comment_id: reply_comment_id },
        blogID,
      )
        .then((rs) => {
          addNewComment(rs.data.data.comment, reply_comment_id)
        })
        .catch((error) => {
          const e = MapErrorResponse((error as AxiosError).response)
          dispatch(
            setNotify({
              title: 'an occurred error',
              description: e.message,
              mustShow: true,
            }),
          )
        })
    }
  }

  const addNewComment = (comment: IComment, reply_comment_id?: string | null) => {
    if (reply_comment_id == null) {
      const temp: ICommentWithReplies = {
        comment: comment,
        replies: [],
      }
      setComments([temp, ...comments])
    } else {
      setComments(
        comments.map((c) => {
          if (c.comment.id == reply_comment_id) {
            var rs = c
            c.replies.push(comment)
            return rs
          }
          return c
        }),
      )
    }
  }

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
    console.log(redirectToComment)
    setTimeout(() => {
      if (redirectToComment && commentRefs.current[redirectToComment]) {
        commentRefs.current[redirectToComment]?.scrollIntoView({ behavior: 'smooth' })
      }
    }, 1500)
  }, [blogID])

  if (isLoading) {
    return <Loader />
  }
  return (
    <section className="bg-white py-8 lg:py-16 antialiased pr-20 pl-20">
      <div className="px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg lg:text-2xl font-bold text-gray-900 ">
            Discussion ({comments.length})
          </h2>
        </div>
        <CommentBox
          yourComment={yourComment}
          setYourComment={setYourComment}
          handleSubmit={handleClickSubmitComment}
          handleDismiss={handleClickDismiss}
        />
        {comments.map((comment) => {
          return (
            <div
              key={comment.comment.id}
              ref={(el) => (commentRefs.current[comment.comment.id] = el)}>
              <BlogComment
                replyTheComment={createBlogComment}
                comment={comment}
              />
            </div>
          )
        })}
      </div>
    </section>
  )
}
