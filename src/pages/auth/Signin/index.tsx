import Signup from "@/components/auth/Signup";
import { useState } from "react";
import Signin from "@/components/auth/Signin";

const index = () => {
  const [mdReg, setMdReg] = useState(false);

  const handleModel = (): void => {
    setMdReg(!mdReg);
  };

  return (
    <>
      {mdReg && <Signup key={1} handleModel={handleModel} />}
      <section>
        <Signin handleModel={handleModel} />
      </section>
    </>
  );
};

export default index;
