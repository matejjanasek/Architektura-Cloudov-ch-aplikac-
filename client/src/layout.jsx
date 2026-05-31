import { Outlet } from "react-router-dom";
import Navigation from "./navigation";

function Layout() {
  return (
    <>
      <Navigation />
      <div className="mt-4">
        <Outlet />
      </div>
    </>
  );
}
export default Layout;
