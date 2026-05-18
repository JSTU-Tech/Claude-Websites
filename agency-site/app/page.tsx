import { Hero } from "./_components/hero";
import { KineticSection } from "./_components/kinetic-section";
import { ProofBar } from "./_components/proof-bar";
import { SitePreviewFold } from "./_components/site-preview-fold";
import { FeaturedCaseStudy } from "./_components/featured-case-study";
import { WhoThisIsFor } from "./_components/who-this-is-for";
import { Process } from "./_components/process";
import { LampFold } from "./_components/lamp-fold";
import { PricingSignal } from "./_components/pricing-signal";
import { SplineShowcase } from "./_components/spline-showcase";
import { Testimonials } from "./_components/testimonials";
import { AboutFounder } from "./_components/about-founder";
import { FinalCta } from "./_components/final-cta";

export default function Home() {
  return (
    <>
      <Hero />
      <KineticSection />
      <ProofBar />
      <SitePreviewFold />
      <FeaturedCaseStudy />
      <WhoThisIsFor />
      <Process />
      <LampFold />
      <PricingSignal />
      <SplineShowcase />
      <Testimonials />
      <AboutFounder />
      <FinalCta />
    </>
  );
}
