import toast from "react-hot-toast";
import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { Mutex } from "async-mutex";

const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
  baseUrl: "https://one-chat-server.vercel.app/api",
});

const customFetchBase: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);

  // eslint-disable-next-line
  if (
    (result.error?.data as any)?.message ===
    "Please check the syntax of the access code"
  ) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();

      try {
        const refreshResult = await baseQuery(
          {
            url: "auth/refresh-token",
            method: "GET",
            credentials: "include",
          },
          api,
          extraOptions
        );

        if (refreshResult.data) {
          result = await baseQuery(args, api, extraOptions);
        } else {
          toast.error("Phiên đăng nhập đã hết hạn");

          await baseQuery(
            {
              url: "auth/logout",
              method: "POST",
              credentials: "include",
            },
            api,
            extraOptions
          );
        }
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }

  return result;
};

export default customFetchBase;
