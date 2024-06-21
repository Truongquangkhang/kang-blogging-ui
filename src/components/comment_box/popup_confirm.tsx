interface Props {
  openPopUp: boolean
  closePopUp: any
  handleConfirm: any
}

const PopUpConfirm = ({ openPopUp, closePopUp, handleConfirm }: Props) => {
  if (openPopUp !== true) return null

  return (
    <div className="fixed inset-0 bg-black flex justify-center items-center bg-opacity-20 backdrop-blur-sm">
      <div className="p-2 bg-white w-1/3 shadow-inner border-e-emerald-600 rounded-lg py-5">
        <div className="w-full p-3 justify-center items-center">
          <h2 className="font-semibold py-3 text-center text-xl">
            The system has detected your comment is toxic. Do you want to proceed
          </h2>
          <div className="flex space-x-3 justify-center mt-5">
            <button
              onClick={() => {
                handleConfirm()
                closePopUp()
              }}
              type="button"
              className={` bg-blue-800 text-white hover:bg-blue-900 items-center py-2.5 px-4 text-xs font-medium text-center bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 hover:bg-primary-800`}>
              Confirm{' '}
            </button>
            <button
              onClick={() => {
                closePopUp()
              }}
              type="button"
              className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center bg-gray-300 rounded-lg focus:ring-4 focus:ring-primary-200 hover:bg-gray-400">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PopUpConfirm
