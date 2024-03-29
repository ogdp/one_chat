import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { Mutex } from "async-mutex";
import { message } from "antd";
// import { logout } from '../features/userSlice';

// Create a new mutex
const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
  baseUrl: "https://one-chat-server.vercel.app/api",
  credentials: "include",
});

const customFetchBase: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // wait until the mutex is available without locking it
  await mutex.waitForUnlock();
  let result: any = await baseQuery(args, api, extraOptions);
  if (result?.error?.data?.type === "token") {
    // console.log("Kiểu Token");
    if (result?.error?.data?.message === "Token has expired") {
      // console.log("Hết hạn à");
      if (!mutex.isLocked()) {
        // console.log("Vao isLocked");
        const release = await mutex.acquire();
        try {
          const refreshResult: any = await baseQuery(
            { credentials: "include", url: "/generateToken" },
            api,
            extraOptions
          );
          // console.log("Try day");
          // console.log("Gen thanh cong", refreshResult);
          if (refreshResult.data.success) {
            result = await baseQuery(args, api, extraOptions);
          } else {
            // console.log("Loi gen token");
          }
          // if (refreshResult.data) {
          //   result = await baseQuery(args, api, extraOptions);
          // } else {
          //   // message.error("Phiên đăng nhập đã hết hạn");
          //   // window.location.href = "/auth";
          //   // await baseQuery(
          //   //   {
          //   //     url: "auth/logout",
          //   //     method: "POST",
          //   //     credentials: "include",
          //   //   },
          //   //   api,
          //   //   extraOptions
          //   // );
          // }
        } finally {
          // console.log("Lỗi genarate Token");
          // console.log("Finally Try");
          // release must be called once the mutex should be released again.
          release();
        }
      } else {
        // console.log("else isLocked");
        // wait until the mutex is available without locking it
        await mutex.waitForUnlock();
        result = await baseQuery(args, api, extraOptions);
      }
    }
    // console.log("Lỗi khác token hết hạn");
    message.error("Phiên đăng nhập đã hết hạn");
    window.location.href = "/auth";
  }

  return result;
};

export default customFetchBase;
