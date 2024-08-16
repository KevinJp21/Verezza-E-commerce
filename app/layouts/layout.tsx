import { ReactNode } from "react";
import NavBar from "./navbar/NavBar";
import Footer from "./footer/Footer";
import './Layout.css'
interface LayoutProps {
    children: ReactNode;
  }
const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <main className="ContainerMain">
      <NavBar />
      {children}
      <Footer />
    </main>
  );
}

export default Layout;