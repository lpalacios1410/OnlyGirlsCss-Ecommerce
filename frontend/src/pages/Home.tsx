import { Category } from "../assets/components/Category";
import { Hero } from "../assets/components/Hero";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

export default function Home() {
  useDocumentTitle("OnlyGirlsCcs - Home");
  return (
    <main id="main-content">
      <Hero />
      <Category />
    </main>
  );
}
