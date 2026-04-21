import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router";

import { Header } from "./assets/components/Header.jsx";
import { Footer } from "./assets/components/Footer.jsx";
import { SpinnerLoading } from "./assets/components/SpinnerLoading.jsx";

const Home = lazy(() => import("./pages/Home.jsx"));
const StoragePage = lazy(() => import("./pages/StoragePage.jsx"));
const ContactPage = lazy(() => import("./assets/components/Contact.jsx"));
const ProductDetail = lazy(() => import("./assets/components/Detail.jsx"));
const NotFoundPage = lazy(() => import("./pages/404.jsx"));
const DashboardOg = lazy(() => import("./assets/components/DashboardOG.jsx"));

function App() {
  return (
    <>
      <Header />
      <Suspense fallback={<SpinnerLoading />}>
        <Routes>
          <Route path="/dashboardAdmin" element={<DashboardOg />} />
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<StoragePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/products/:productId" element={<ProductDetail />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
      <Footer />
    </>
  );
}

export default App;
