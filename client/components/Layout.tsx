import Nav from '../components/Nav';
import Footer from './Footer';
interface LayoutProps {
  children?: JSX.Element | JSX.Element[];
  signup?: boolean;
}
// * pass down logged in property to nav component
const Layout = (props: LayoutProps) => {
  return (
    <div className="layout flex flex-col h-screen ">
      <Nav signup={props.signup} />
      <div className="bg-gradient-to-b from-[#EBFFFE] to-white">
        <main className="my-20 ">{props.children}</main>
      </div>

      <Footer />
    </div>
  );
};
export default Layout;
