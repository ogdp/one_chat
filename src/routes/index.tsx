import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Page403, Page404, Page500, Success } from "@/pages";
import RouteClient from "./RouteClient";
import RouteAuth from "./RouteAuth";

const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<RouteClient />} />
          <Route path="/auth" element={<RouteAuth />} />
          <Route path="/unauthorized" element={<Page403 />} />
          <Route path="/oauth-error" element={<Page500 />} />
          <Route path="/success-payment" element={<Success />} />
          <Route path="/*" element={<Page404 />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
export default Router;
