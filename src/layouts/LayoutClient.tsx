import { Outlet } from "react-router-dom";
import { HeaderComp } from "@/components";
import NavBarComp from "@/components/client/NavBar/NavBarComp";
import { useSelector, useDispatch } from "react-redux";
import { onActionPost, offActionPost } from "@/slices";

const LayoutClient = () => {
  const dispatch = useDispatch();
  return (
    <>
      <div
        className="bg-backgroundLight dark:bg-backgroundDark  text-gray-700"
        onClick={() => dispatch(offActionPost())}
      >
        <aside>
          <div className="fixed top-0 left-0 min-w-full bg-white z-10">
            <HeaderComp />
          </div>
          <div className="fixed w-[18%] pt-[57px] min-h-screen ">
            <NavBarComp />
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
