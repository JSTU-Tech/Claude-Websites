import { Hero } from "./_components/hero";
import { ProofBar } from "./_components/proof-bar";
import { KineticSection } from "./_components/kinetic-section";
import { FeaturedCaseStudy } from "./_components/featured-case-study";
import { WhoThisIsFor } from "./_components/who-this-is-for";
import { Process } from "./_components/process";
import { PricingSignal } from "./_components/pricing-signal";
import { Testimonials } from "./_components/testimonials";
import { AboutFounder } from "./_components/about-founder";
import { FinalCta } from "./_components/final-cta";

export default function Home() {
  return (
    <>
      <Hero />
      <ProofBar />
      <KineticSection />
      <FeaturedCaseStudy />
      <WhoThisIsFor />
      <Process />
      <PricingSignal />
      <Testimonials />
      <AboutFounder />
      <FinalCta />
    </>
  );
}
