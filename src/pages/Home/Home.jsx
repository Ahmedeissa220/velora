import Hero from "../../components/Hero/Hero";
import FeaturedProduct from "../../components/FeaturedProduct/FeaturedProduct";
import TrendingRight from "../../components/TrendingRight/TrendingRight";
import Testimonial from "../../components/Testimonial/Testimonial";
import Newsletter from "../../components/Newsletter/Newsletter";
import Footer from "../../components/Footer/Footer";

function Home() {
  return (
    <div>
      <Hero />
      <FeaturedProduct />
      <TrendingRight />
      <Testimonial />
      <Newsletter />
      <Footer />
    </div>
  );
}

export default Home;
