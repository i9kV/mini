
import FAQ from "@/components/faq";
import Features from "@/components/features";
import Footer from "@/components/footer";
import Hero from "@/components/hero";
import { Navbar } from "@/components/navbar";
import Pricing from "@/components/pricing";
import Testimonials from "@/components/testimonials";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="pt-13">
        <Hero />
        <Features />
        {/* <Pricing />
        <FAQ />
        <Testimonials /> */}

        <Footer />
      </main>
    </>
  );
}
