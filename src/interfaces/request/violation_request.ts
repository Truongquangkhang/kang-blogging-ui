export interface GetViolationsRequest {
    page: number
    pageSize: number
    type?: string | null
    user_ids?: string | null
}

export interface CreateReportRequest {
    type: string
    targetId: string
    reason: string
    description?: string
}