import CardsSection from "@/components/home/CardsSection";
import Carousel from "@/components/home/Carousal";
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
			<CardsSection />
		</main>
	);
}

export default page;
