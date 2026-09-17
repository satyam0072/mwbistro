import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import WhyVisit from "@/components/WhyVisit";
import CoupleSection from "@/components/CoupleSection";
import MenuSection from "@/components/MenuSection";
import Gallery from "@/components/Gallery";
import Booking from "@/components/Booking";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import MobileCta from "@/components/MobileCta";

const Home = () => (
    <main data-testid="home-page">
        <Navbar />
        <Hero />
        <Marquee />
        <About />
        <WhyVisit />
        <CoupleSection />
        <MenuSection />
        <Gallery />
        <Booking />
        <Contact />
        <Footer />
        <MobileCta />
    </main>
);

export default Home;
