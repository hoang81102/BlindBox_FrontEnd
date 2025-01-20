import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";

const CustomerLayout = ({ children }) => {
  return (
    <div className="customer-layout">
      <Header />
      <main>{children}</main>
      <Footer />
      {/* <div></div>  testt lát xoá */}
    </div>
  );
};

export default CustomerLayout;
