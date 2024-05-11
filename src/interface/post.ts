export interface IPost {
  _id?: string;
  author?: Author;
  contents?: string;
  images?: any[];
  likes?: any[];
  comments?: any[];
  shares?: any[];
  status?: boolean;
  deleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Author {
  _id: string;
  information: Information;
}

export interface Information {
  firstName: string;
  lastName: string;
  avatar_url: string[];
}
