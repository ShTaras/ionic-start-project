export interface UserResponseModel {
  success: boolean;
  data: {
    id: number,
    first_name: string,
    last_name: string,
    email: string,
    role: string,
    model_code: string,
    qr_code_link: string,
    api_token?: string
  };
}
