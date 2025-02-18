import { React } from "react";
import "./BlindBox.scss";
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
import SortOptions from "./SortOptions/SortOptions";

const BlindBox = () => {
  return (
    <div className="main-blind-box">
      <Banner />

      <div className="content-layout full-width-content">
        <SideBar />

        <div className="main-content">
          <SortOptions />
          <div id="best-sellers">
            <BestSeller />
          </div>
          <div id="feature-product">
            <FeatureProduct />
          </div>
          <div id="flash-sale">
            <FlashSale />
          </div>
          <div id="exclusive-deals">
            <ExclusiveDeals />
          </div>
          <div id="latest-collections">
            <LatestCollections />
          </div>
          <div id="blog-section">
            <BlogSection />
          </div>
          <div id="customer-reviews">
            <CustomerReviews />
          </div>
          <div id="lucky-box-game">
            <LuckyBoxGame />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlindBox;
