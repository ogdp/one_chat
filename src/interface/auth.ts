export interface ISignInResponse {
  message: string;
  accessToken: string;
  refreshToken: string;
  userNew: IUser;
}

export interface IUser {
  active_status: string;
  information: {
    avatar_url: string[];
    _id: string;
  };
  _id: string;
  firstName: string;
  lastName: string;
  email_tel: string;
  dateOfBirth: string;
  gender: string;
  avatar_url: string[];
  refreshToken: IRefreshToken[];
  role: string;
  deleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IRefreshToken {
  key: number;
  token: string;
}
