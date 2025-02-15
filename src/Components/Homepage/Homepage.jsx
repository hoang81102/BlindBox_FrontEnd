import { React } from "react";
import "./HomePage.scss";
import LuckyBoxGame from "./LuckyBoxGame/LuckyBoxGame";
import BlogSection from "./BlogSection/BlogSection";
import LatestCollections from "./LatestCollections/LatestCollections";
import ExclusiveDeals from "./ExclusiveDeals/ExclusiveDeals";
import CustomerReviews from "./CustomerReview/CustomerReviews";
import FlashSale from "./FlashSale/FlashSale";
import FeatureProduct from "./FeatureProduct/FeatureProduct";
import BestSeller from "./BestSeller/BestSeller";
import SideBar from "./SideBar/SideBar";
import Banner from "./Banner/Banner";

const HomePage = () => {
  return (
    <div className="homepage">
      <Banner />

      {/* Content Layout - Full Width */}
      <div className="content-layout full-width-content">
        <SideBar />

        {/* Main Content */}
        <div className="main-content">
          <BestSeller />
          <FeatureProduct />
          <FlashSale />
          <ExclusiveDeals />
          <LatestCollections />
          <BlogSection />
          <CustomerReviews />
          <LuckyBoxGame />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
