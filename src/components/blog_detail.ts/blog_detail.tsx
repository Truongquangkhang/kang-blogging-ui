import { IBlogMetadata } from '../../interfaces/model/blog_metadata'

interface Prods {
  blog: IBlogMetadata
}

const BlogDetail = ({ blog }: Prods) => {
  return (
    <div className="max-w-sm w-full lg:max-w-full lg:flex">
      <div
        className="lg:h-auto lg:w-2/5 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
        style={{
          backgroundSize: 'fit',
          backgroundImage: `url(${blog.thumbnail})`,
        }}
        title="Woman holding a mug"
      />
      <div className="w-2/3 border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
        <div className="mb-8">
          <p className="text-sm text-gray-600 flex items-center mb-3">
            <svg
              className="fill-current text-gray-500 w-3 h-3 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20">
              <path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />
            </svg>
            Members only
          </p>
          <div className="text-gray-900 font-bold text-xl mb-2 text-left">
            {blog.name}
          </div>
          <p className="text-gray-700 text-base text-left">{blog.description}</p>
        </div>
        <div className="flex items-center">
          <img
            className="w-10 h-10 rounded-full mr-4"
            src="https://images.viblo.asia/70x70/2c2c2c17-8e84-48fc-9c40-2d1ee2cd6ec8.jpg"
            alt="Avatar of Jonathan Reinink"
          />
          <div className="text-sm">
            <p className="text-gray-900 leading-none">{blog.author.name}</p>
            <p className="text-gray-600">{blog.createdAt}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogDetail
