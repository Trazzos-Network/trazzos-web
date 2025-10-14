import { HeroSection } from "@/components/hero-section";
import { FeaturesSection } from "@/components/features-section";
import { ClientsSection } from "@/components/clients-section";
import { TechMarquee } from "@/components/tech-marquee";
import { ProductSection } from "@/components/product-section";
import { TeamSection } from "@/components/team-section";
import { SocialProofSection } from "@/components/social-proof-section";
import { CtaSection } from "@/components/cta-section";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <HeroSection />
      <TechMarquee />
      <FeaturesSection />
      <ProductSection />
      <SocialProofSection />
      <ClientsSection />
      <TeamSection />
      <CtaSection />
      <Footer />
    </main>
  );
}
