import Nav from '../components/Nav';
import Footer from './Footer';
interface LayoutProps {
  children?: JSX.Element | JSX.Element[];
  signup?: boolean;
}
// * pass down logged in property to nav component
const Layout = (props: LayoutProps) => {
  return (
    <div className="layout">
      <Nav signup={props.signup} />
      <main>{props.children}</main>
      <Footer />
    </div>
  );
};
export default Layout;
