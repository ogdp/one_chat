export interface ISignInResponse {
  success: boolean;
  message: string;
  accessToken: string;
  refreshToken: string;
  userNew: UserNew;
}

export interface UserNew {
  _id: string;
  email_tel: string;
  active_status: string;
  role: string;
  information: Information;
  deleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Information {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  location: string;
  province: string;
  avatar_url: string[];
  _id: string;
}
