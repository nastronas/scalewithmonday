import { Seo } from "@/components/Seo";
import { Hero } from "@/components/sections/Hero";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { AdMarquee } from "@/components/sections/AdMarquee";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { Results } from "@/components/sections/Results";
import { WhyMonday } from "@/components/sections/WhyMonday";
import { Testimonial } from "@/components/sections/Testimonial";
import { Faq } from "@/components/sections/Faq";
import { AuditForm } from "@/components/sections/AuditForm";

/*
  Home — persuasion ordered landing page:
  Hero, trust strip, creative marquee (work), services, process, results,
  why Monday, testimonial, FAQ, then the audit form (audit) as the closing CTA.
  No data files / no schemas. Instruction: build the Monday agency marketing site.
*/

export default function Home() {
  return (
    <>
      <Seo
        title="Monday | Full Stack Growth Partner for Scaling eCommerce Brands"
        description="Monday is a boutique full stack growth agency for eCommerce DTC brands. Paid ads, creative production, email, and landing pages engineered to scale you to 8 and 9 figures."
        path="/"
      />
      <Hero />
      <TrustStrip />
      <AdMarquee />
      <Services />
      <Process />
      <Results />
      <WhyMonday />
      <Testimonial />
      <Faq />
      <AuditForm />
    </>
  );
}
