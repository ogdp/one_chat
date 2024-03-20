// import { Navigate, Outlet, useLocation } from "react-router-dom";

// import { LoadingAll } from "../pages";
// import { useInfoAccountQuery } from "../api";

// export const PrivateRoute = ({ allowedRoles }: { allowedRoles: string[] }) => {
//   const location = useLocation();
//   const { data, isSuccess, isFetching, isLoading } = useInfoAccountQuery("");

//   if (isLoading || isFetching) {
//     return <LoadingAll />;
//   }

//   return (isSuccess || data) && allowedRoles.includes(data?.data?.role) ? (
//     <Outlet />
//   ) : isSuccess && data ? (
//     <Navigate to="/unauthorized" state={{ from: location }} replace />
//   ) : (
//     <Navigate to="/admin-login" state={{ from: location }} replace />
//   );
// };
