import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { HeaderC, HomeC, FooterC } from "../../components";

const BaseClient = () => {
  return (
    <>
      <div className="bg-backgroundLight dark:bg-backgroundDark">
        <HeaderC />
        <Toaster />
        <HomeC />
        <Outlet />
        <FooterC />
      </div>
    </>
  );
};

export default BaseClient;
