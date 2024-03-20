import { BrowserRouter, Route, Routes } from "react-router-dom";

// import { PrivateRoute } from "./utils";
import { Page403, Page500, Success } from "@/pages";
import RouteClient from "@/pages/client/RouteClient";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<RouteClient />} />
          {/* 
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route
            element={
              <PrivateRoute
                allowedRoles={[
                  "User",
                  "Admin",
                  "Manager",
                  "Human Resources Manager",
                  "Reservation Manager",
                  "Room Manager",
                  "Facilities Manager",
                ]}
              />
            }
          >
            <Route path="/auth/*" element={<RouteAuth />} />
          </Route> */}
          {/* <Route
            element={
              <PrivateRoute
                allowedRoles={[
                  "Admin",
                  "Manager",
                  "Human Resources Manager",
                  "Reservation Manager",
                  "Room Manager",
                  "Facilities Manager",
                ]}
              />
            }
          >
            <Route path="/admin/*" element={<RouteAdmin />} />
          </Route> */}
          <Route path="/unauthorized" element={<Page403 />} />
          <Route path="/oauth-error" element={<Page500 />} />
          <Route path="/success-payment" element={<Success />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
