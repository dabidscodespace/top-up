import { useRef } from "react";
import GamesSection from "../components/GamesSection";
import Hero from "../components/Hero";

const Home = () => {
  const gamesRef = useRef(null);

  const scrollToGames = () => {
    const section = gamesRef.current;
    if (section) {
      const headerOffset = 60;
      const elementPosition =
        section.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div>
      <Hero onExploreClick={scrollToGames} />
      <GamesSection ref={gamesRef} />
    </div>
  );
};

export default Home;
