import { Category } from "../assets/components/Category.jsx";
import { Hero } from "../assets/components/Hero.jsx";

export default function Home() {
  const title = "OnlyGirlsCcs - Home";
  return (
    <main>
      <title>{title}</title>
      <Hero />
      <Category />
    </main>
  );
}
