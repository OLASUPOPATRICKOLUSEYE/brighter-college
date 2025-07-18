import Hero from "@/components/Hero";

const mainImages = [
  "/bg1.jpg",
  "/bg2.jpg",
  "/bg3.jpg",
  "/bg4.jpg",
];

const MainHero = () => {
  return (
    <Hero
      images={mainImages}
      interval={5000}
      overlay={true}
      heightClass="h-[85vh]"
    />
  );
};

export default MainHero;
