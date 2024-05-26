import { useParams } from 'react-router-dom'

const Category = () => {
  const { id } = useParams()
  return (
    <div className="p-10">
      <div className="max-w-screen-md mx-auto">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <p>Catego</p>
        </div>
        <div className="bg-white py-2 px-3">
          <nav className="flex flex-wrap gap-4">
            <a
              href="#"
              className="inline-flex whitespace-nowrap border-b-2 border-transparent py-2 px-3 text-sm font-medium text-gray-600 transition-all duration-200 ease-in-out hover:border-b-purple-600 hover:text-purple-600">
              {' '}
              Account{' '}
            </a>
            <a
              href="#"
              className="inline-flex whitespace-nowrap border-b-2 border-transparent py-2 px-3 text-sm font-medium text-gray-600 transition-all duration-200 ease-in-out hover:border-b-purple-600 hover:text-purple-600">
              {' '}
              Settings{' '}
            </a>
            <a
              href="#"
              className="inline-flex whitespace-nowrap border-b-2 border-transparent border-b-purple-600 py-2 px-3 text-sm font-semibold text-purple-600 transition-all duration-200 ease-in-out">
              {' '}
              Orders{' '}
            </a>
            <a
              href="#"
              className="inline-flex whitespace-nowrap border-b-2 border-transparent py-2 px-3 text-sm font-medium text-gray-600 transition-all duration-200 ease-in-out hover:border-b-purple-600 hover:text-purple-600">
              {' '}
              Sales{' '}
            </a>
            <a
              href="#"
              className="inline-flex whitespace-nowrap border-b-2 border-transparent py-2 px-3 text-sm font-medium text-gray-600 transition-all duration-200 ease-in-out hover:border-b-purple-600 hover:text-purple-600">
              {' '}
              Suppliers{' '}
            </a>
          </nav>
        </div>
      </div>

      <p>Category</p>
      <p>{id}</p>
    </div>
  )
}

export default Category
