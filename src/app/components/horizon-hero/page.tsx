import { HorizonHeroSection } from "@/components/ui/horizon-hero-section";

export const metadata = {
  title: "Horizon Hero Section 3D — Front Ref",
  description: "Página completa de Hero Section 3D com Three.js, partículas estelares, atmosfera, montanhas em paralaxe e efeito pós-processamento Bloom.",
};

export default function HorizonHeroStandalonePage() {
  return <HorizonHeroSection backHref="/" showTopNav={true} />;
}
