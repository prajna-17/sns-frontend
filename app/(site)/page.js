import BestSellerSlider from "@/components/home/BestSellerSlider";
import CardsSection from "@/components/home/CardsSection";
import Carousel from "@/components/home/Carousal";
import CategoryShowcase from "@/components/home/CategoryShowcase";
import PosterGrid from "@/components/home/PosterGrid";
import ProductSlider from "@/components/home/ProductSlider";
import ShowcaseSlider from "@/components/home/Showcase";

function page() {
  return (
    <main className="homepage">
      <Carousel />
      <PosterGrid />
      <ShowcaseSlider />
      <ProductSlider />
      <CategoryShowcase />
      <BestSellerSlider />
      <CardsSection />
    </main>
  );
}

export default page;
