import axiosDetection from "./axios_detection";

const ApiDetectContent = {
    detectContent: (content: string)=>{
        const url = '/api/v1/detect-content/';
        return axiosDetection.post<DetectContentResponse>(url, {
            content: content
        })
     },
}


export default ApiDetectContent