import Footer from "./Footer"
import Navbar from "./Navbar"
//import Navbar from "./TailwindNavbar"



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