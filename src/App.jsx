import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ScrollVisual from "./components/ScrollVisual";
import FeatureSection from "./components/FeatureSection";
import CTA from "./components/CTA";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ScrollVisual />
        <FeatureSection />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
