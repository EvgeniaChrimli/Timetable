import { Link } from "react-router";
import LInkBack from "./LInkBack";

const Header = () => {
  return (
    <header className="header">
      <LInkBack />
      <Link to="/timeTablePage">Расписание</Link>
    </header>
  );
};

export default Header;
