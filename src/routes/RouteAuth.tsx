import { Route, Routes } from "react-router-dom";
import Signin from "@/pages/auth/SigninPage";
import { Page404 } from "@/pages";

const RouteAuth = () => {
  return (
    <>
      <Routes>
        <Route index element={<Signin />}></Route>

        <Route path="/*" element={<Page404 />} />
      </Routes>
    </>
  );
};

export default RouteAuth;
