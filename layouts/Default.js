import SideNavBar from "../components/Navbar";

const Layout = ({ children }) => {
  return (
    <div>
      <SideNavBar>
        {children}
      </SideNavBar>
    </div>
  );
}

export default Layout;