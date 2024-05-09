
export const getAccess = (payload: any)=>{
    return {
        type: "GET_ACCESS_TOKEN",
        payload: payload,
    }
}
