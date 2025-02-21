import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";

const CustomerLayout = ({ children }) => {
  return (
    <div className="customer-layout">
      
      <main>{children}</main>
     
    </div>
  );
};

export default CustomerLayout;
