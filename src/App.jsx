import { Route, Routes } from "react-router";
import { Home } from "./pages/Home.jsx";
import { StoragePage } from "./pages/StoragePage.jsx";
import { NotFoundPage } from "./pages/404.jsx";
import { ContactPage } from "../src/assets/components/Contact.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<StoragePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
