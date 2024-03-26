import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Page403, Page500, Success } from "@/pages";
// import LayoutClient from "@/layouts/LayoutClient";
import LayoutAuth from "@/layouts/LayoutAuth";

const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<LayoutAuth />} />
          <Route path="/unauthorized" element={<Page403 />} />
          <Route path="/oauth-error" element={<Page500 />} />
          <Route path="/success-payment" element={<Success />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
export default Router;
