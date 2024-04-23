import { IUserPro } from "@/interface/user";
import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { Mutex } from "async-mutex";

// import { logout } from '../features/userSlice';
// Socket.io
import { io } from "socket.io-client";

const url = "http://localhost:8080";

export let socket: any;
const getSocket = (user: IUserPro) => {
  socket = io(url);
  socket.emit("setup", user);
  socket.on("connected", () => {
    // setconnectedtosocket(true);
  });
  return socket;
};
// --

// Create a new mutex
const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
  baseUrl: `${url}/api`,
  credentials: "include",
  prepareHeaders: (headers) => {
    return headers;
  },
});

const customFetchBase: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // wait until the mutex is available without locking it
  await mutex.waitForUnlock();
  let result: any = await baseQuery(args, api, extraOptions);
  if (result?.data?.message == "Get user information successfully.") {
    await getSocket(result?.data?.user);
  }
  if (result?.error?.data?.type === "token") {
    // console.log("Kiểu Token");
    // console.log(result?.error?.data);
    if (result?.error?.data?.message === "Token has expired") {
      // console.log("Hết hạn à");
      if (!mutex.isLocked()) {
        // console.log("Vao isLocked");
        const release = await mutex.acquire();
        try {
          const refreshResult: any = await baseQuery(
            { credentials: "include", url: "/auth/generateToken" },
            api,
            extraOptions
          );
          // console.log("Try day");
          // console.log("Gen thanh cong", refreshResult);
          if (refreshResult.error) {
            // console.log("error gen token RF");
            if (refreshResult?.error?.data?.error)
              return (window.location.href = "/auth");
            return console.log(refreshResult.error);
          }
          if (refreshResult.data.success) {
            return (result = await baseQuery(args, api, extraOptions));
          }
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
      return false;
    } else {
      // console.log("Lỗi khác token hết hạn");
      // message.error("Phiên đăng nhập đã hết hạn");
      return (window.location.href = "/auth");
    }
  }
  return result;
};

export default customFetchBase;
