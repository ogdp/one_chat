// import { Result } from "antd";
// import { Loading } from "../..";
// import { useInfoAccountQuery } from "../../../api";
// import { InfoUser } from "../../../components";

// const ProfilePage = () => {
//   const { data, isLoading, isSuccess } = useInfoAccountQuery("");
//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center">
//         <Loading />
//       </div>
//     );
//   }

//   if (!isSuccess) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <Result title="Không tìm thấy người dùng" status={404} />
//       </div>
//     );
//   }

//   return (
//     <>
//       <div className="rounded-xl bg-light dark:bg-dark p-3 w-full">
//         <div className="border-b p-1 border-divideLight dark:border-divideDark">
//           <div className="flex items-center gap-10">
//             <div>
//               <h2 className="text-2xl font-bold text-textLight dark:text-textDark">
//                 Thông tin cá nhân
//               </h2>
//               <p className="text-base mt-3 text-textLight2nd dark:text-textDark2nd">
//                 Cập nhật thông tin của bạn và tìm hiểu các thông tin này được sử
//                 dụng ra sao
//               </p>
//             </div>
//           </div>
//         </div>

//         <InfoUser user={data?.data} />
//       </div>
//       <div>

//       </div>
//     </>
//   );
// };

// export default ProfilePage;
