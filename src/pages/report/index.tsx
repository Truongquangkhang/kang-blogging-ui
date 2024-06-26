import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import ApiViolation from '../../apis/kang-blogging/violation'
import { useAppDispatch } from '../../hooks'
import { setNotify } from '../../redux/reducers/notify'
import { MapErrorResponse } from '../../utils/map_data_response'
import { AxiosError } from 'axios'

interface RadioButtonProps {
  id: string
  name: string
  label: string
  checked: boolean
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const RadioButton: React.FC<RadioButtonProps> = ({
  id,
  name,
  label,
  checked,
  onChange,
}) => {
  return (
    <div className="flex items-center mb-4">
      <input
        id={id}
        type="radio"
        name={name}
        checked={checked}
        onChange={onChange}
        className="form-radio h-5 w-5 text-blue-600"
      />
      <label
        htmlFor={id}
        className="ml-2 text-gray-700">
        {label}
      </label>
    </div>
  )
}

const Report = () => {
  const [searchParam] = useSearchParams()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [selectedOption, setSelectedOption] = useState<string>('')
  const [reportedURL, setReportedURL] = useState(
    `${searchParam.get('type') ?? ''}/${searchParam.get('target_id') ?? ''}`,
  )
  const [description, setDescription] = useState('')
  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.id)
  }
  const handlerSubmit = () => {
    ApiViolation.creaetReport({
      reason: selectedOption,
      targetId: searchParam.get('target_id') ?? '',
      type: searchParam.get('type') ?? '',
      description: description,
    })
      .then(() => {
        dispatch(setNotify({ title: 'Success', description: '', mustShow: true }))
        navigate(`/${reportedURL}`)
      })
      .catch((error) => {
        const e = MapErrorResponse((error as AxiosError).response)
        dispatch(setNotify({ title: 'Error', description: e.message, mustShow: true }))
      })
  }

  return (
    <div className="flex flex-col p-5 space-y-5 w-full items-center">
      <p className="text-3xl font-bold">Report</p>
      <div className="p-6 text-base bg-white rounded-lg w-2/3">
        <div className="flex flex-col w-full">
          <label className="text-left font-semibold">Reason</label>
          <div className="p-4">
            <RadioButton
              id="toxic"
              name="reportIssue"
              label="Toxic"
              checked={selectedOption === 'toxic'}
              onChange={handleRadioChange}
            />
            <RadioButton
              id="nontoxic"
              name="reportIssue"
              label="Non-Toxic"
              checked={selectedOption === 'nontoxic'}
              onChange={handleRadioChange}
            />
            <RadioButton
              id="spamOrCopyrightIssue"
              name="reportIssue"
              label="Spam or copyright issue"
              checked={selectedOption === 'spamOrCopyrightIssue'}
              onChange={handleRadioChange}
            />
            <RadioButton
              id="other"
              name="reportIssue"
              label="Other"
              checked={selectedOption === 'other'}
              onChange={handleRadioChange}
            />
          </div>
        </div>
        <div className="flex flex-col w-full mt-3">
          <label className="text-left font-semibold">Reported URL</label>
          <input
            className="mt-2 appearance-none border rounded w-full py-2 px-3 text-gray-700"
            id="name"
            type="text"
            placeholder="Reported url"
            value={reportedURL}
            onChange={(e) => {
              setReportedURL(e.target.value)
            }}
          />
        </div>
        <div className="flex flex-col w-full mt-5">
          <label className="text-left font-semibold">Message</label>
          <textarea
            value={description ?? ''}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="px-2 pt-2 w-full text-left text-x text-gray-700 leading-tight border-r rounded-lg rounded-t-lg border border-gray-200"
            required></textarea>
        </div>
        <button
          onClick={() => {
            handlerSubmit()
          }}
          type="button"
          className="mt-5 inline-flex items-center py-2.5 px-4 text-xs font-medium text-center bg-blue-800   text-white rounded-lg focus:ring-4 focus:ring-primary-200 hover:bg-blue-900">
          Submit
        </button>
      </div>
    </div>
  )
}

export default Report
