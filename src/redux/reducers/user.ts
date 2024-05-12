import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IUSerMetadata } from '../../interfaces/model/user_metadata'
import { GetFromLocalStorageByKey, SetValueToLocalStorageWithKey } from '../../utils/local_storage'

interface userState{
    user?: IUSerMetadata
} 

const user = GetFromLocalStorageByKey("user")

const initialState: userState ={
    user: user
}

const userSlice = createSlice({
  name: 'user',
  initialState ,
  reducers: {
    setUser(state, action: PayloadAction<IUSerMetadata>) {
        state.user = action.payload
        SetValueToLocalStorageWithKey("user", action.payload)
    },
  },
})

export const { setUser } = userSlice.actions
export default userSlice.reducer