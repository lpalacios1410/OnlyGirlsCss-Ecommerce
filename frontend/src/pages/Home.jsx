import { useEffect } from "react";
import { Category } from "../assets/components/Category.jsx";
import { Hero } from "../assets/components/Hero.jsx";

export default function Home() {
  useEffect(() => {
    document.title = "OnlyGirlsCcs - Home";
  }, []);
  return (
    <main id="main-content">
      <Hero />
      <Category />
    </main>
  );
}
