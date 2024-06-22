import { useEffect, useRef, useState } from 'react'

interface Props {
  handlerEdit: any
  handlerDelete: any
}

export const ButtonSettingComment = ({ handlerEdit, handlerDelete }: Props) => {
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const [coords, setCoords] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => {
      document.removeEventListener('mousedown', handler)
    }
  }, [])

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setCoords({ x: e.clientX - 130, y: e.clientY })
    setOpen(!open)
  }

  return (
    <>
      <button
        onClick={handleClick}
        className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500  bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50"
        type="button">
        <svg
          className="w-4 h-4"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 16 3">
          <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
        </svg>
        <span className="sr-only">Comment settings</span>
      </button>
      {open && (
        <div
          ref={menuRef}
          style={{ left: `${coords.x}px` }}
          className={`absolute w-36 mt-24 bg-white rounded divide-y divide-gray-100 shadow`}>
          <ul
            className="py-1 text-sm text-gray-700"
            aria-labelledby="dropdownMenuIconHorizontalButton">
            <li>
              <a
                onClick={() => {
                  handlerEdit()
                }}
                className="block py-2 px-4 hover:bg-gray-100">
                Edit
              </a>
            </li>
            <li>
              <a
                onClick={() => {
                  handlerDelete()
                }}
                className="block py-2 px-4 hover:bg-gray-100">
                Remove
              </a>
            </li>
          </ul>
        </div>
      )}
    </>
  )
}
