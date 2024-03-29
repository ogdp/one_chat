import { Cookies } from "react-cookie";

const cookies = new Cookies();
export const getAccessToken = (): string | undefined => {
  return cookies.get("accessToken");
};
export const getRefreshToken = (): string | undefined => {
  return cookies.get("refreshToken");
};
export const setAccessToken = (token: string): void => {
  cookies.set("accessToken", token, { path: "/", maxAge: 1 * 60 * 60 });
};
export const setRefreshToken = (token: string): void => {
  cookies.set("refreshToken", token, { path: "/", maxAge: 7 * 24 * 60 * 60 });
};
