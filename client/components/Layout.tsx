import Nav from '../components/Nav';
import Footer from './Footer';
const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Nav />
      <main>{children}</main>
      <Footer />
    </div>
  );
};
export default Layout;
