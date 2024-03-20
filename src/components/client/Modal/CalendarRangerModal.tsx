// import { useState } from "react";
// import moment from "moment";
// import qs from "query-string";
// import { useLocation, useNavigate } from "react-router-dom";

// import { useCalendarRangerModal } from "../../../hooks";
// import { Calendar, Modal } from "../..";

// const CalendarRangerModal = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const calendarRangerModal = useCalendarRangerModal();
//   const params = new URLSearchParams(location.search);
//   const checkin = params.get("checkin");
//   const checkout = params.get("checkout");

//   const [dateRange, setDateRange] = useState({
//     startDate: checkin ? checkin : moment().format("YYYY-MM-DD"),
//     endDate: checkout ? checkout : moment().add(1, "days").format("YYYY-MM-DD"),
//   });

//   const onSubmit = () => {
//     let currentQuery = {};

//     if (location.search) {
//       currentQuery = qs.parse(location.search.toString());
//     }

//     // eslint-disable-next-line
//     const updatedQuery: any = {
//       ...currentQuery,
//       hotel: location.pathname.split("/hotel-detail/")[1],
//     };

//     if (dateRange.startDate) {
//       updatedQuery.checkin = dateRange.startDate;
//     }

//     if (dateRange.endDate) {
//       updatedQuery.checkout = dateRange.endDate;
//     }

//     const url = qs.stringifyUrl(
//       {
//         url: "/booking",
//         query: updatedQuery,
//       },
//       { skipNull: true }
//     );

//     calendarRangerModal.onClose();
//     navigate(url);
//   };

//   const bodyContent = (
//     <div className="flex flex-col gap-3 justify-center items-center">
//       <Calendar
//         dateRange={dateRange}
//         onChange={(value) => {
//           setDateRange(value);
//         }}
//       />
//     </div>
//   );

//   return (
//     <Modal
//       isOpen={calendarRangerModal.isOpen}
//       onClose={calendarRangerModal.onClose}
//       onSubmit={onSubmit}
//       title="Chọn ngày"
//       actionLabel="Đặt phòng"
//       body={bodyContent}
//     />
//   );
// };

// export default CalendarRangerModal;
