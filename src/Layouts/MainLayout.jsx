import { Outlet } from "react-router-dom";
import NavBar from "../components/Header/NavBar";
import Footer from "../components/Footer/Footer";

function MainLayout() {
  return (
    <>
      <NavBar />

      <main>
        <Outlet />
      </main>

      <Footer />
    </>
  );
}

export default MainLayout;
