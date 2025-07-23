import Hero from "@/components/Hero";

const mainImages = [
  "/gallery1.jpg",
  "/gallery2.jpg",
  "/gallery.jpg",
  "/gallery4.jpg",
];

const GalleryHero = () => {
  return (
    <Hero
      images={mainImages}
      interval={5000}
      overlay={true}
      heightClass="h-[100vh]"
    />
  );
};

export default GalleryHero;
