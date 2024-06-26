import { GetViolationResponse } from '../../interfaces/response/violation_response';
import { CreateReportRequest, GetViolationsRequest } from './../../interfaces/request/violation_request';
import axiosClient from "./axios_client";

const ApiViolation = {
    getViolations: (params: GetViolationsRequest)=>{
        const url = '/api/v1/violation';
        return axiosClient.get<GetViolationResponse>(url, {params: params})
    },
    creaetReport: (params: CreateReportRequest) => {
        const url = '/api/v1/report';
        return axiosClient.post(url, params)
    }
}

export default ApiViolation