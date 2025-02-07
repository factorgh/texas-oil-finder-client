import Header from "./header";
import Hero from "./hero";
import Tabs from "./tabs";

// eslint-disable-next-line react/prop-types
const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Hero />
      <div className="container mx-auto">
        <Tabs />
      </div>
      <div className="container mx-auto py-10 flex-1">{children}</div>
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;
