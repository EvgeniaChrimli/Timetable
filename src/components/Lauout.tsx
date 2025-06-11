import Header from "./Header";
import { Outlet } from "react-router";

const Lauout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default Lauout;
