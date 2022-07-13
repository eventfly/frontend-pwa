import Footer from "./Footer"
// import Navbar from "./Navbar"
import Navbar from "./StackBitNavbar"



const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      { children }
      <Footer />
    </div>
  );
}
 
export default Layout;