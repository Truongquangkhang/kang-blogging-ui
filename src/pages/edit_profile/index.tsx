import { useState } from 'react'
import ImageUploader from '../../components/upload_image'
import { useAppSelector } from '../../hooks'

const EditProfile = () => {
  const userStates = useAppSelector((state) => state.user)
  const [avatar, setAvatar] = useState(userStates.user?.avatar ?? '')
  const [name, setName] = useState(userStates.user?.name)
  const [displayName, setDisplayName] = useState(userStates.user?.displayName)
  const [email, setEmail] = useState(userStates.user?.name)

  return (
    <div className="flex flex-col space-y-10 w-full p-10 items-center justify-center">
      <div className="flex-col space-y-3 justify-start w-2/3 rounded-lg border border-gray-100 bg-white px-4 py-3 shadow-lg">
        <label className="text-xl font-bold items-start">User</label>
        <div className="flex-col space-y-5 mt-5">
          <div className="flex-col text-left">
            <label className="text-x font-semibold">Name</label>
            <input
              className="mt-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Full Name"
              // value={name}
              // onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex-col text-left">
            <label className="text-x font-semibold">Display Name</label>
            <input
              className="mt-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Show name"
              // value={name}
              // onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex-col text-left">
            <label className="text-x font-semibold">Email</label>
            <input
              className="mt-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Your email"
              // value={name}
              // onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex-col text-left">
            <ImageUploader
              imageSrc={avatar}
              setImageSrc={setAvatar}
            />
          </div>
        </div>
      </div>
      <div className="flex space-x-3">
        <button
          type="button"
          className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center bg-blue-400   text-white rounded-lg focus:ring-4 focus:ring-primary-200 hover:bg-blue-700">
          Submit
        </button>
        <button
          type="button"
          className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center bg-gray-300 rounded-lg focus:ring-4 focus:ring-primary-200 hover:bg-gray-400">
          Dismiss
        </button>
      </div>
    </div>
  )
}

export default EditProfile
