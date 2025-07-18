import Hero from "@/components/Hero";

const mainImages = [
  "/about1.jpg",
  "/about2.jpg",
  "/about3.jpg",
];

const CalendarHero = () => {
  return (
    <Hero
      images={mainImages}
      interval={5000}
      overlay={true}
      heightClass="h-[100vh]"
    />
  );
};

export default CalendarHero;
