import ListBlog from './components/list_blog'
import { ListCategory } from './components/list_category'

const Home = () => {
  return (
    <div className="flex space-x-5">
      <div className="w-3/5">
        <div className="text-left font-semibold text-xl tracking-tight mb-5">
          <p>Blogs</p>
        </div>
        <ListBlog Published={true} />
      </div>
      <div className="w-2/5">
        <div className="text-left font-semibold text-xl tracking-tight mb-5">
          <p>Categories</p>
        </div>
        <div className="justify-start">
          <ListCategory />
        </div>
      </div>
    </div>
  )
}

export default Home
