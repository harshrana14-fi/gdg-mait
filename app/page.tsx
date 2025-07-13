import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import EventsSection from "@/components/EventsSection";
import CertificateSection from "@/components/CertificateSection";
import TeamSection from "@/components/TeamSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-white text-black scroll-smooth">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <EventsSection />
      <CertificateSection />
      <TeamSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
