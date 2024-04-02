import { Route, Routes } from "react-router-dom";
import LayoutClient from "@/layouts/LayoutClient";
import { ChatPage, HomePage, Page404, ProfilesPage } from "@/pages";
import ResultSearchUser from "@/pages/client/ResultSearchUser";

const RouteClient = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LayoutClient />}>
          <Route index element={<HomePage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/chat/:uid" element={<ChatPage />} />
          <Route path="/profiles" element={<ProfilesPage />} />
          <Route path="/search/top" element={<ResultSearchUser />} />
        </Route>
        <Route path="/*" element={<Page404 />} />
      </Routes>
    </>
  );
};

export default RouteClient;
