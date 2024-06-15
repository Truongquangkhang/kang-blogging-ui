import ApiImage from '../../apis/kang-blogging/image'

interface Props {
  imageSrc: string
  setImageSrc: any
  eager?: string | null
}

const ImageUploader = ({ imageSrc, setImageSrc, eager }: Props) => {
  const handleImageChange = (event: any) => {
    var bodyFormData = new FormData()
    const file = event.target.files[0]
    bodyFormData.append('image', file)
    bodyFormData.append('eager', eager ?? 'w_924,h_528,c_pad')
    ApiImage.uploadImage(bodyFormData)
      .then((rs) => {
        setImageSrc(rs.data.data.url)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleRemoveImage = () => {
    setImageSrc('')
  }
  if (imageSrc == '') {
    return (
      <label className="cursor-pointer btn btn-outline relative py-2.5 px-4 w-1/4 mr-2 text-xs font-medium bg-blue-500 text-white rounded-lg focus:ring-4 focus:ring-primary-200 hover:bg-blue-900">
        Upload image
        <input
          data-testid="cover-image-input"
          id="cover-image-input"
          type="file"
          accept="image/*"
          data-max-file-size-mb="25"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          onChange={handleImageChange}
        />
        <span
          data-testid="tooltip"
          className="absolute z-10 p-2 mt-1 text-sm text-white bg-gray-800 rounded shadow-md min-w-[190px] hidden group-hover:block"></span>
      </label>
    )
  }
  return (
    <div
      className="flex justify-center space-x-10"
      role="presentation">
      {imageSrc && (
        <img
          src={imageSrc}
          width="250"
          height="105"
          className="mb-2"
        />
      )}
      <div className="flex items-center space-x-2">
        <label className="cursor-pointer btn btn-outline relative">
          Change
          <input
            data-testid="cover-image-input"
            id="cover-image-input"
            type="file"
            accept="image/*"
            data-max-file-size-mb="25"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            onChange={handleImageChange}
          />
          <span
            data-testid="tooltip"
            className="absolute z-10 p-2 mt-1 text-sm text-white bg-gray-800 rounded shadow-md min-w-[190px] hidden group-hover:block">
            Use a ratio of 1000:420 for best results.
          </span>
        </label>
        <button
          type="button"
          className="btn btn-ghost text-red-600 border-red-300"
          onClick={handleRemoveImage}>
          Remove
        </button>
      </div>
    </div>
  )
}

export default ImageUploader
