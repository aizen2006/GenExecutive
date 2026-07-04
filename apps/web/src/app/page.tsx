import Hero from "@/Components/sections/Hero";
import About from "@/Components/sections/About";
import Features from "@/Components/sections/Features";
import Pricing from "@/Components/sections/Pricing";
import { Testimonials } from "@/Components/testimonials";
import FAQ from "@/Components/sections/FAQ";
import CTA from "@/Components/sections/CTA";
import Footer from "@/Components/sections/footer";

export default function Home() {
  return (
    <main className="flex flex-col">
      <Hero />
      <About />
      <Features />
      <Pricing />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
} 
