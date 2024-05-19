import { IBlogMetadata } from '../../interfaces/model/blog_metadata'

interface Prods {
  blog: IBlogMetadata
}

const BlogDetail = ({ blog }: Prods) => {
  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className="md:flex">
        <div className="md:shrink-0">
          <img
            className="h-48 w-full object-cover md:h-full md:w-52"
            src={blog.thumbnail}
            alt="Modern building architecture"
          />
        </div>
        <div className=" bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
          <div className="mb-8">
            <div className="flex mb-2 justify-start">
              {blog.categories.map((category, index) => {
                if (index == 5) {
                  return
                }
                return (
                  <a
                    key={category.id}
                    className="bg-blue-100 hover:bg-blue-200 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-white dark:text-blue-400 border border-blue-400 inline-flex items-center justify-center cursor-pointer">
                    {category.name}
                  </a>
                )
              })}
            </div>
            <div className="text-gray-900 font-bold text-base mb-2 text-left cursor-pointer hover:text-blue-900">
              {blog.name}
            </div>
            <p className="text-gray-700 text-sm text-left">{blog.description}</p>
          </div>
          <div className="flex items-center">
            <img
              className="w-10 h-10 rounded-full mr-2"
              src={blog.author.avatar ?? ''}
              alt={blog.author.displayName}
            />
            <div className="flex-col space-y-2 text-xs justify-center">
              <p className="text-gray-900 leading-none">{blog.author.name}</p>
              <span className="bg-gray-300 text-gray-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded me-2 border-gray-500 ">
                <svg
                  className="w-2.5 h-2.5 me-1.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20">
                  <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z" />
                </svg>
                3 days ago
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogDetail
