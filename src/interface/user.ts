export interface IInformation {
  _id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  location?: string;
  province?: string;
  avatar_url: Array<string>;
  createdAt?: string;
  updatedAt?: string;
}

export interface IUser {
  _id: string;
  email_tel: string;
  active_status: boolean;
  role: string;
  information: IInformation;
  password?: string;
  refreshToken?: Array<string>;
  deleted?: boolean;
  createdAt: string;
  updatedAt: string;
}
