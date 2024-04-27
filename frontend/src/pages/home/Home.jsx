import React from "react";
import "./Home.scss";
import Slider from "../../components/slider/Slider";
import HomeInfoBox from "./HomeInfoBox";
import { productData } from "../../components/carousel/data";
import Carouseltem from "../../components/carousel/Carouseltem";
import ProductCarousel from "../../components/carousel/Carousel";
import ProductsCategory from "./ProductsCategory";
import FooterLinks from "../../components/footer/FooterLinks";

const PageHeading = ({ heading, btnText }) => {
  return (
    <>
      <div className="--flex-between">
        <h2 className="--fw-thin">{heading}</h2>
        <button className="--btn">{btnText}</button>
      </div>

      <div className="--hr"></div>
    </>
  );
};

function Home() {
  const productss = productData.map((item) => (
    <div key={item.id}>
      <Carouseltem
        name={item.name}
        url={item.imageurl}
        price={item.price}
        description={item.description}
      />
    </div>
  ));

  return (
    <div>
      <Slider />
      <section>
        <div className="container">
          <HomeInfoBox />
          <PageHeading heading="Latest Products" btnText="Shop Now" />
          <ProductCarousel products={productss} />
        </div>
      </section>

      <section className="--bg-grey">
        <div className="container">
          <h3>Categories</h3>
          <ProductsCategory />
        </div>
      </section>

      <section>
        <div className="container">
          <PageHeading heading="Mobile Phones" btnText="Shop Now" />
          <ProductCarousel products={productss} />
        </div>
      </section>

      <FooterLinks />
    </div>
  );
}

export default Home;
