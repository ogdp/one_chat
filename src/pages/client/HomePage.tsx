import HomeBarComp from "@/components/client/Home/HomeBarComp";
import HomeContentComp from "@/components/client/Home/HomeContentComp";

const HomePage = () => {
  return (
    <>
      <main className="flex bg-[#f4f4f5]">
        <div className="w-[55%]">
          <HomeContentComp />
        </div>
        <div className="w-[35%] fixed right-0 top-0 h-screen pt-[55px]">
          <HomeBarComp />
        </div>
      </main>
    </>
  );
};

export default HomePage;
