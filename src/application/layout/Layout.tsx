
import { Outlet } from "react-router-dom";
import { Navbar } from "../../presentation/components/ui/Navbar";
import { Footer } from "../../presentation/components/ui/Footer";

export const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-bunny-yellow-lighter">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
