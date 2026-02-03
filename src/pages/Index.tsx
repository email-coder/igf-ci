import Layout from "@/components/layout/Layout";
import HeroCarousel from "@/components/home/HeroCarousel";
import NewsSection from "@/components/home/NewsSection";
import AboutSection from "@/components/home/AboutSection";
import QuickAccessSection from "@/components/home/QuickAccessSection";
import PublicationsSection from "@/components/home/PublicationsSection";
import DirectorSection from "@/components/home/DirectorSection";
import OrganizationTabs from "@/components/home/OrganizationTabs";
import FAQSection from "@/components/home/FAQSection";

const Index = () => {
  return (
    <Layout>
      {/* Hero Carousel */}
      <HeroCarousel />

      {/* News Section - À la une */}
      <NewsSection />

      {/* About Section */}
      <AboutSection />

      {/* Quick Access - Services/Missions */}
      <QuickAccessSection />

      {/* Director Quote */}
      <DirectorSection />

      {/* Organization Tabs */}
      <OrganizationTabs />

      {/* Publications */}
      <PublicationsSection />

      {/* FAQ Section */}
      <FAQSection />
    </Layout>
  );
};

export default Index;