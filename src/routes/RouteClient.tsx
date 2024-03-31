import { Route, Routes } from "react-router-dom";
import InfoUser from "@/components/auth/Profile/InfoUser";
import LayoutClient from "@/layouts/LayoutClient";
import HomePage from "@/pages/client/HomePage";
import { Page404 } from "@/pages";
import ChatPage from "@/pages/client/ChatPage";

const RouteClient = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LayoutClient />}>
          <Route index element={<HomePage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/chat/:uid" element={<ChatPage />} />

          <Route path="/profiles" element={<InfoUser />} />
        </Route>
        <Route path="/*" element={<Page404 />} />
      </Routes>
    </>
  );
};

export default RouteClient;
