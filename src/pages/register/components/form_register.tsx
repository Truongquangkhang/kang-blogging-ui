import { useEffect, useState } from 'react'
import ApiIam from '../../../apis/kang-blogging/iam'
import { ConverDateStringToTimeStamp } from '../../../utils/convert'
import { IRegisterRequest } from '../../../interfaces/request/iam_request'
import { useAppDispatch } from '../../../hooks'
import { setNotify } from '../../../redux/reducers/notify'
import { MapErrorResponse } from '../../../utils/map_data_response'
import { AxiosError } from 'axios'
import PopUp from './popup_registre_success'
import LoadingButton from '../../../components/loading_button/loading_button'

const FormRegister = () => {
  const [openPopup, setOpenPopup] = useState(false)
  const [name, setName] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumbers, setPhoneNumbers] = useState('')
  const [gender, setGender] = useState(true)
  const [birthDay, setBirthDay] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassowrd, setRepeatPassword] = useState('')
  const [isValidUserName, setIsValidUsername] = useState(true)
  const [isMatchingPassword, setIsMatchingPassword] = useState(true)
  const dispatch = useAppDispatch()

  const checkRepeatPassword = (repeatPassword: any) => {
    if (repeatPassword != '') {
      if (repeatPassword != password) {
        setIsMatchingPassword(false)
      } else {
        setIsMatchingPassword(true)
      }
    }
  }

  useEffect(() => {
    let countTimeout: any
    if (username != '') {
      countTimeout = setTimeout(() => {
        ApiIam.checkExistUsername(username)
          .then((response) => {
            setIsValidUsername(response.data.data.alreadyExist)
          })
          .catch(() => {
            setIsValidUsername(false)
          })
        console.log('Log Here')
      }, 2000)
    } else {
      clearTimeout(countTimeout)
    }
    return () => {
      clearTimeout(countTimeout)
    }
  }, [username])

  useEffect(() => {
    return checkRepeatPassword(repeatPassowrd)
  }, [password, repeatPassowrd])

  const handlerClickButtonCreate = async () => {
    if (
      name != '' &&
      displayName != '' &&
      email != '' &&
      phoneNumbers != '' &&
      gender != null &&
      birthDay != '' &&
      username != '' &&
      password != '' &&
      !isValidUserName &&
      isMatchingPassword
    ) {
      const request: IRegisterRequest = {
        name: name,
        email: email,
        display_name: displayName,
        birth_day: ConverDateStringToTimeStamp(birthDay),
        gender: gender,
        phone_numbers: phoneNumbers,
        username: username,
        password: password,
      }

      await ApiIam.register(request)
        .then((response) => {
          console.log(response)
          setOpenPopup(true)
        })
        .catch((error) => {
          const rs = MapErrorResponse((error as AxiosError).response)
          dispatch(
            setNotify({
              title: rs.message,
              description: rs.message,
              mustShow: true,
            }),
          )
        })
    } else {
      dispatch(
        setNotify({
          title: 'Missing required fiels',
          description: '',
          mustShow: true,
        }),
      )
    }
  }

  return (
    <div className="w-1/2 text-left">
      <p className="text-2xl font-bold text-center mb-5">Register</p>
      <form className=" bg-gray-50 shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="text"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="-mx-3 flex flex-wrap">
          <div className="mb-4 w-full px-3 sm:w-1/2">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Display Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="displayName"
              type="text"
              placeholder="Display Name"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
          </div>
          <div className="mb-4 w-full px-3 sm:w-1/2">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Phone Numbers
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="phone_numbers"
              type="text"
              placeholder="Phone Numbers"
              value={phoneNumbers}
              onChange={(e) => setPhoneNumbers(e.target.value)}
            />
          </div>
        </div>
        <div className="-mx-3 flex flex-wrap">
          <div className="mb-4 w-full px-3 sm:w-1/2">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Date Of Birth
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="displayName"
              type="date"
              placeholder="Date Of Birth"
              value={birthDay}
              onChange={(e) => {
                setBirthDay(e.target.value)
              }}
            />
          </div>
          <div className="mb-4 w-full px-3 sm:w-1/2">
            <label className="block text-gray-700 text-sm font-bold mb-2">Gender</label>
            <select
              id="countries"
              onChange={(e) => {
                setGender(e.target.value == 'Male')
                console.log(gender)
              }}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
              <option
                selected
                value="Male">
                Male
              </option>
              <option value="Female">Female</option>
            </select>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Username</label>
          <input
            className={`shadow appearance-none border ${
              isValidUserName ? 'border-red-500' : ''
            } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
            id="username"
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <p
            className={`absolute ${
              isValidUserName ? 'block' : 'hidden'
            } text-red-500 text-xs italic`}>
            Username already exist
          </p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="******************"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* <p className="text-red-500 text-xs italic">Please choose a password.</p> */}
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Repeat Password
          </label>
          <input
            className={`shadow appearance-none border ${
              !isMatchingPassword ? 'border-red-500' : ''
            } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
            id="repeatPassword"
            type="password"
            placeholder="******************"
            value={repeatPassowrd}
            onChange={(e) => {
              setRepeatPassword(e.target.value)
            }}
          />
          <p
            className={`absolute ${
              !isMatchingPassword ? 'block' : 'hidden'
            } text-red-500 text-xs italic`}>
            Password not matching
          </p>
        </div>
        <div className="items-center justify-between">
          {/* <button
            className=" w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={() => {
              handlerClickButtonCreate()
            }}>
            Create
          </button> */}
          <LoadingButton
            name="Register"
            onClick={handlerClickButtonCreate}
          />
        </div>
      </form>
      <PopUp
        openPopUp={openPopup}
        closePopUp={() => {
          setOpenPopup(false)
        }}
      />
    </div>
  )
}

export default FormRegister
