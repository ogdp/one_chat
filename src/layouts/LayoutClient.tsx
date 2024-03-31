import { Outlet } from "react-router-dom";
import { HeaderC } from "@/components";
import NavBarC from "@/components/client/NavBar/NavBarC";

const LayoutClient = () => {
  return (
    <>
      <div className="bg-backgroundLight dark:bg-backgroundDark">
        <aside>
          <div className="fixed top-0 left-0 min-w-full bg-white">
            <HeaderC />
          </div>
          <div className="fixed w-[18%] pt-[57px] min-h-screen ">
            <NavBarC />
          </div>
        </aside>
        <main className="pl-[18%] flex pt-[57px]">
          <div className="w-full h-[calc(100vh_-_57px)]">
            <Outlet />
          </div>
        </main>
      </div>
    </>
  );
};

export default LayoutClient;
