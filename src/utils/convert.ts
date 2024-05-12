export const ConverDateStringToTimeStamp = (date: string) =>{
    let result = Date.parse(date);
    console.log(result);
    return result
}