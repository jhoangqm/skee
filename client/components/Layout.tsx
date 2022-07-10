import Nav from '../components/Nav';
import Footer from './Footer';
const Layout = ({ children, signup }) => {
  return (
    <div className="layout">
      <Nav signup={signup} />
      <main>{children}</main>
      <Footer />
    </div>
  );
};
export default Layout;
