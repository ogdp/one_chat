import { Route, Routes } from "react-router-dom";
import LayoutAuth from "@/layouts/LayoutAuth";

const RouteClient = () => {
  return (
    <>
      <Routes>
        <Route index element={<LayoutAuth />}>
          {/* <Route index element={<HomePage />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/hotel-list" element={<HotelListPage />} />
          <Route path="/hotel-detail/:id" element={<HotelDetailPage />} />
          <Route path="/payment/:id" element={<PaymentPage />} />
          <Route
            path="/complaint-resolution-policy"
            element={<ComplaintResolutionPolicy />}
          />
          <Route
            path="/regulations-booking-information"
            element={<RegulationsBookingInformation />}
          />
          <Route path="/general-rules" element={<GeneralRules />} />
          <Route path="/general-terms" element={<GeneralTerms />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} /> */}
        </Route>

        {/* <Route path="/*" element={<Page404 />} /> */}
      </Routes>
    </>
  );
};

export default RouteClient;
