export interface Response {
    code: number,
    status: boolean,
    message: string,
    data: loginResponse
}


export interface loginResponse {
    accessToken: string,
    upiId: string,
    firstName: string,
    lastName: string,
    emailId: string

}
