import { Category } from "../assets/components/Category.jsx";
import { Footer } from "../assets/components/Footer.jsx";
import { Header } from "../assets/components/Header.jsx";
import { Hero } from "../assets/components/Hero.jsx";

export function Home() {
  const title = "OnlyGirlsCcs - Home";
  return (
    <main>
      <title>{title}</title>
      <Header />
      <Hero />
      <Category />
      <Footer />
    </main>
  );
}
