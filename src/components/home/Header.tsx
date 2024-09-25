import { Link } from "react-router-dom";
import { ModeToggle } from "../ModeToggle";
import AuthV1Btn from "./AuthV1Btn";
import Navbar, { NavBtn } from "./Navbar";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-neutral-900 border-b">
      <div className="container flex justify-between items-center h-16">
        <div>
          <Logo />
        </div>
        <nav className="flex gap-4 items-center">
          <Navbar />
          <AuthV1Btn />
          <ModeToggle />
          <NavBtn />
        </nav>
      </div>
    </header>
  );
}

export const Logo = () => {
  return (
    <Link to="/" className="text-lg font-semibold">
      VITE<span className="text-primary">SHOP</span>
    </Link>
  );
};
