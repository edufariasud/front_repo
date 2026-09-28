import { QuordixHero } from "@/components/ui/quordix-hero";

export const metadata = {
  title: "Quordix Hero Section — Front Ref",
  description: "Página completa de Hero Section com canvas interativo de pontos e animação glitch com navbar flutuante em glassmorphism.",
};

export default function QuordixHeroStandalonePage() {
  return <QuordixHero backHref="/" showNavbar={true} />;
}
