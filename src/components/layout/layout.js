import Footer from "./footer/footer";
import Navbar from "./navbar/navbar";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
};
export default Layout;
