import { Button } from "react-bootstrap";
import "./Banner.scss";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "bootstrap/dist/css/bootstrap.min.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import LabubuLogo from "../../../Assets/Image/Labubu_Logo.jpg";
import BlindBoxCollection1 from "../../../Assets/Image/BlindBoxCollection.avif";
import BlindBoxCollection2 from "../../../Assets/Image/BlindBoxCollection2.jpg";
import BlindBoxCollection3 from "../../../Assets/Image/BlindBoxCollection3.jpg";
import BlindBoxCollection4 from "../../../Assets/Image/BlindBoxCollection4.jpg";
import BlindBoxCollection5 from "../../../Assets/Image/BlindBoxCollection5.jpg";
import BlindBoxCollection6 from "../../../Assets/Image/BlindBoxCollection6.jpg";
import BlindBoxCollection7 from "../../../Assets/Image/BlindBoxCollection7.avif";

const Banner = () => {
  const bannerImages = [
    BlindBoxCollection1,
    BlindBoxCollection2,
    BlindBoxCollection3,
    BlindBoxCollection4,
    BlindBoxCollection5,
    BlindBoxCollection6,
    BlindBoxCollection7,
  ];
  return (
    <section className="banner text-center vibrant-banner">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        navigation
        pagination={{ clickable: true }}
        className="banner-swiper"
      >
        {bannerImages.map((image, index) => (
          <SwiperSlide key={index}>
            <div
              className="banner-slide"
              style={{ backgroundImage: `url(${image})` }}
            >
              <div className="banner-overlay">
                <img src={LabubuLogo} alt="Logo" className="banner-logo" />
                <h1 className="full-width-title">Blind Box Collection</h1>
                <p className="full-width-subtitle">
                  Discover the magic of surprise!
                </p>
                <Button variant="primary" size="lg" className="glow-effect">
                  Shop Now
                </Button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Banner;
