import { useNavigate } from 'react-router-dom'

interface Props {
  openPopUp: boolean
  closePopUp: any
}

const PopUp = ({ openPopUp, closePopUp }: Props) => {
  const navigate = useNavigate()
  const handleButtonContinue = () => {
    closePopUp()
    navigate('/login')
  }

  if (openPopUp !== true) return null

  return (
    <div className="fixed inset-0 bg-black flex justify-center items-center bg-opacity-20 backdrop-blur-sm">
      <div className="p-2 bg-white w-10/12 md:w-1/4 h-1/4 lg:1/2 shadow-inner border-e-emerald-600 rounded-lg py-5">
        <div className="w-full p-3 justify-center items-center">
          <h2 className="font-semibold py-3 text-center text-xl">
            Congratulations, your account has been successfully created.
          </h2>
          <div className="flex justify-center items-center">
            <button
              className="mt-3 w-1/3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={() => {
                handleButtonContinue()
              }}>
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PopUp
