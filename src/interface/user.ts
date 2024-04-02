export interface IGuest {
  success: boolean;
  message: string;
  userGuest: IUserGuest;
}
interface IUserGuest {
  _id: string;
  active_status: string;
  role: string;
  information: Information;
  deleted: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Information {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  location: string;
  province: string;
  avatar_url: string[];
  _id: string;
}

export interface IUpdateUser {
  _id?: string;
  email_tel: string;
  active_status: string;
  role: string;
  information: Information2;
  password: string;
}

export interface Information2 {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  avatar_url: string[];
  location: string;
  province: string;
}

export interface IUserProfiles {
  success: boolean;
  message: string;
  user: IUserPro;
}

interface IUserPro {
  _id: string;
  email_tel: string;
  active_status: string;
  role: string;
  information: InformationPro;
  deleted: boolean;
  createdAt: string;
  updatedAt: string;
}

interface InformationPro {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  avatar_url: string[];
  _id: string;
}